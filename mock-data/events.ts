import { isSameDay } from "date-fns";

export interface Event {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  date: string;
  participants: string[];
  meetingLink?: string;
  timezone?: string;
}

export const events: Event[] = [];

export function addEvent(event: Omit<Event, "id">) {
  const newEvent: Event = {
    ...event,
    id: Math.random().toString(36).substr(2, 9),
  };
  events.push(newEvent);
  return newEvent;
}

export function deleteEvent(id: string) {
  const index = events.findIndex((e) => e.id === id);
  if (index !== -1) {
    events.splice(index, 1);
  }
}

export function updateEvent(updatedEvent: Event) {
  const index = events.findIndex((e) => e.id === updatedEvent.id);
  if (index !== -1) {
    events[index] = updatedEvent;
  }
}

export function getTodayEvents(): Event[] {
  const today = new Date();
  return events.filter((event) => isSameDay(new Date(event.date), today));
}
