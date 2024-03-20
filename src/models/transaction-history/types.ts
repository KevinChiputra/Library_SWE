import { CartModel } from '@models/cart/types';

interface TransactionHistory extends CartModel {
  totalProduct: number;
}

interface TransactionHistoryModel {
  transactionHistory: TransactionHistory[];
}

enum TransactionHistoryActionType {
  ADD_TO_TRANSACTION_HISTORY = 'ADD_TO_TRANSACTION_HISTORY'
}

type TransactionHistoryAction = {
  type: TransactionHistoryActionType.ADD_TO_TRANSACTION_HISTORY;
  value?: TransactionHistory;
};

export { TransactionHistoryActionType };
export type {
  TransactionHistoryAction,
  TransactionHistory,
  TransactionHistoryModel
};
