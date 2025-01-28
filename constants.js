import { startOfDay, endOfDay, startOfMonth, endOfMonth, startOfYear, endOfYear, sub } from "date-fns";

export const transactionViews = ["Yearly", "Monthly", "Daily"];

export const TRANSACTION_PERIODS_ON_VIEWS = {
  Yearly: {
    current: {
      from: startOfYear(new Date()),
      to: new Date(),
    },
    previous: {
      from: startOfYear(sub(new Date(), { years: 1 })),
      to: endOfYear(sub(new Date(), { years: 1 })),
    },
  },
  Monthly: {
    current: {
      from: startOfMonth(new Date()),
      to: new Date(),
    },
    previous: {
      from: startOfMonth(sub(new Date(), { months: 1 })), // subtract 1 month from new date and find start of the month
      to: endOfMonth(sub(new Date(), { months: 1 })),
    },
  },
  Daily: {
    current: {
      from: startOfDay(new Date()),
      to: new Date(),
    },
    previous: {
      from: startOfDay(sub(new Date(), { days: 1 })),
      to: endOfDay(sub(new Date(), { days: 1 })),
    },
  },
};

export const TRANSACTION_TYPES = {
  INCOME: "Income",
  EXPENSE: "Expense",
  SAVINGS: "Savings",
  INVESTMENT: "Investment",
};

export const categories = ["Food", "Housing", "Car", "Entertainment"];

export const types = Object.values(TRANSACTION_TYPES);
