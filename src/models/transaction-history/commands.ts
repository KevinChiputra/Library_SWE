import { TransactionHistory } from './types';

const transactionHistoryCommands = {
  addToTransactionHistory: (transactionHistory: TransactionHistory) => {
    return {
      type: 'ADD_TO_TRANSACTION_HISTORY',
      value: transactionHistory
    };
  }
};

export { transactionHistoryCommands };
