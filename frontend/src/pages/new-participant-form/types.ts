import { Moment } from "moment";
import { EventDuration, period } from "../../../../types";

export type queryString = "form" | "dashboard";

export interface timeSlot {
  fromTime: Moment | null;
  toTime: Moment | null;
  isValid: boolean;
}

export interface DateRangeState<T> {
  fromDate: T;
  toDate: T;
  isValid: boolean;
  isRange: boolean;
}

export type DateAndTimeInput = {
  dateRange: DateRangeState<Moment | null>;
  timeSlots: timeSlot[];
};

export type NewParticipantDateAndTimeInput = DateAndTimeInput[];

export interface EventInfo {
  venue: string;
  organizer: string;
  evnetPossibleDataAndTime: period[];
  participantCount: number;
  eventDuration: EventDuration;
}

export interface SelectedDateMap {
  [key: string]: boolean;
}

export type FormErrors =
  | "Invalid time range"
  | "Invalid date range"
  | "Name cannot be empty"
  | "There are overlap dates"
  | "There are invalid date inputs"
  | "There are invalid time inputs";
