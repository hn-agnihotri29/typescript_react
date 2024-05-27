import { useEffect, useState } from 'react';
import './App.css';
import ReminderList from './components/ReminderList';
import Reminder from './interfaces/reminder';
import reminderService from "./services/api"
import NewReminder from './components/NewReminder';

function App() {

  const [ reminders, setReminder ]= useState<Reminder[]>([])
  
  const loadReminders = async () => {
    const reminders = await reminderService.getReminders();
    setReminder(reminders)
  }

  const removeReminder = (id: number) => {
    setReminder(reminders.filter(reminder => reminder.id !== id))
  }

  const addReminder = async (title: string) => {
    const newRemider = await reminderService.addReminder(title);
    setReminder([newRemider, ...reminders]);
  }
  
  useEffect(() => {
    loadReminders();
  }, [])

  return (
    <div className="App">
        <NewReminder onAddReminder = {addReminder}/>
        <ReminderList  items={reminders} onRemoveReminder={removeReminder} />
    </div> 
  );
}

export default App;
