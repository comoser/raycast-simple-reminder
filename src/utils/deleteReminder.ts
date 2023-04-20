import { LocalStorage } from "@raycast/api";
import { Reminder } from "../types/reminder";

type DeleteReminderProps = {
  reminderId: string;
  existingReminders: Reminder[];
  setReminders: (reminders: Reminder[]) => void;
};

export async function deleteReminder(props: DeleteReminderProps) {
  props.setReminders(props.existingReminders.filter((existingReminder) => existingReminder.id !== props.reminderId));
  await LocalStorage.removeItem(props.reminderId);
}
