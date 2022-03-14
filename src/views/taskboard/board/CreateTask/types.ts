export interface StateProps {
  name: string;
  category: any;
  subCategory: any;
  client: number[];
  frequency: string | null;
  feeAmount: string | null;
  priority: string | null;
  startDate: string | null;
  dueDate: string | null;
  labels: any[];
  members: any[];
  taskLeader: any;
  financialYear: number | null;
  expectedCompletionDate: string | null;
}

export interface RecurringStateProps {
  name: string;
  category: any;
  subCategory: any;
  client: number[];
  frequency: string | null;
  feeAmount: string | null;
  priority: string | null;
  recurringStartDate: string | null;
  recurringEndDate: string | null;
  dueDay: number | null;
  customDates: Array<{ startDate: string; dueDate: string }>;
  labels: any[];
  members: any[];
  taskLeader: any;
  financialYear: number | null;
}
