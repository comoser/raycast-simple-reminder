import { LocalStorage, updateCommandMetadata } from '@raycast/api';
import { Reminder } from './types/reminder';
import { runAppleScript } from 'run-applescript';

export default async function Command() {
  const storedRemindersObject = await LocalStorage.allItems<Record<string, string>>();
  if (!Object.keys(storedRemindersObject).length) return;

  for (const key in storedRemindersObject) {
    const reminder: Reminder = JSON.parse(storedRemindersObject[key]);
    // TODO: this date comparison is very crude, needs more refining
    if (new Date(reminder.date).getTime() >= new Date().getTime()) {
      await runAppleScript(
        `display notification "${reminder.topic}" with title "Reminder" sound name "default"`
      );
      await LocalStorage.removeItem(reminder.id);
    }
  }

  await updateCommandMetadata({ subtitle: `Last time checked for reminders: ${new Date().toLocaleString()}` });
}
