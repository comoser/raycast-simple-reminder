import { Reminder } from "../types/reminder";
import { LocalStorage } from "@raycast/api";
import { dateSortPredicate } from "./dateSortPredicate";

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
}
