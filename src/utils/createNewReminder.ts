import { Reminder } from '../types/reminder';
import { LocalStorage, showToast, Toast } from '@raycast/api';
import { dateSortPredicate } from './dateSortPredicate';
import Style = Toast.Style;

type CreateNewReminderProps = {
  reminder: Reminder;
  existingReminders: Reminder[];
  setReminders: (reminders: Reminder[]) => void;
  setSearchText: (text: string) => void;
};

export async function createNewReminder(props: CreateNewReminderProps) {
  const newReminderList = [...props.existingReminders, props.reminder];
  newReminderList.sort(dateSortPredicate);
  props.setReminders(newReminderList);
  await LocalStorage.setItem(props.reminder.id, JSON.stringify(props.reminder));
  props.setSearchText("");
  await showToast(Style.Success, "Reminder set", "When the time is right, we'll notify you!")
}
