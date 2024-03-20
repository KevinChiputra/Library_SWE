import { combineReducers, createStore } from '@nxweb/core';
import {
  createCommandHook,
  createDispatchHook,
  createStoreHook,
  createStoreProvider
} from '@nxweb/react';

import { booksCommand } from './books/commands.js';
import { booksReducer } from './books/reducers.js';
import { cartCommands } from './cart/commands.js';
import { cartReducer } from './cart/reducers.js';
import { productsCommand } from './products/commands.js';
import { productsReducer } from './products/reducers.js';

import type { RootAction, RootModel } from './types.js';

// ** Init reducers
const rootReducer = combineReducers({
  books: booksReducer,
  products: productsReducer,
  cart: cartReducer
});

// ** Init models
const rootModel: RootModel = {
  books: {},
  products: {},
  cart: { cart: [] }
};

// ** Init commands
const rootCommand = {
  books: booksCommand,
  products: productsCommand,
  cart: cartCommands
};

// ** Create store
export const store = createStore(rootReducer, rootModel);

// ** Create store provider
export const StoreProvider = createStoreProvider(store);

// ** Create store hook
export const useStore = createStoreHook<RootModel, RootAction>();

// ** Create command hook
export const useCommand = createCommandHook(rootCommand);

// ** Create dispatch hook
export const useDipatch = createDispatchHook<RootModel, RootAction>();
