import { useState } from 'react';
import { Action, ActionPanel, List } from "@raycast/api";
import { randomUUID } from 'crypto';
import { useFetchStoredReminders } from './hooks/useFetchStoredReminders';
import { Reminder } from './types/reminder';
import { createNewReminder } from './utils/createNewReminder';
import { extractTopicAndDateFromInputText } from './utils/extractTopicAndDateFromInputText';
import { deleteReminder } from './utils/deleteReminder';

export default function Command() {
  const [searchText, setSearchText] = useState('');
  const [reminders, setReminders] = useState<Reminder[]>([]);

  useFetchStoredReminders(setReminders);

  const onSetReminderAction = async () => {
    // TODO: this may fail, we need to verify that we have both topic and date as !== undefined
    const { topic, date } = extractTopicAndDateFromInputText(searchText);

    await createNewReminder({
      reminder: {
        id: randomUUID(),
        topic,
        date,
      },
      existingReminders: reminders,
      setReminders,
      setSearchText,
    });
  };

  const onDeleteReminderAction = async (reminderId: string) => {
    await deleteReminder({
      reminderId,
      existingReminders: reminders,
      setReminders,
    });
  };

  return (
    <List
      searchText={searchText}
      searchBarPlaceholder="remind me to speak with Joana tomorrow at 1pm"
      onSearchTextChange={setSearchText}
      filtering={false}
    >
      <List.Item
        title="Set reminder"
        icon="alarm.png"
        actions={
          <ActionPanel>
            <Action
              autoFocus
              title="Set Reminder"
              icon="alarm.png"
              onAction={onSetReminderAction}
            />
          </ActionPanel>
        }
      />
      <List.Section
        title="Existing reminders"
        subtitle="you can edit existing reminders"
      >
        {reminders.map(reminder => (
          <List.Item
            key={reminder.id}
            title={reminder.topic}
            subtitle={`set to ${reminder.date.toLocaleString()}`}
            actions={
              <ActionPanel>
                <Action
                  title="Delete Reminder"
                  icon="trash.png"
                  onAction={() => onDeleteReminderAction(reminder.id)}
                />
              </ActionPanel>
            }
          />
        ))}
      </List.Section>
    </List>
  );
}
