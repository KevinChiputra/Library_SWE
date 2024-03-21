import { TransactionHistoryActionType } from './types';

import type {
  TransactionHistoryAction,
  TransactionHistoryModel
} from './types';

const transactionHistoryReducer = (
  state: TransactionHistoryModel = { transactionHistory: [] },
  action: Readonly<TransactionHistoryAction>
) => {
  switch (action.type) {
    case TransactionHistoryActionType.ADD_TO_TRANSACTION_HISTORY:
      if (state.transactionHistory && action.value) {
        state.transactionHistory.push(action.value);
      }

      return { ...state };
    default:
      return state;
  }
};

export { transactionHistoryReducer };
