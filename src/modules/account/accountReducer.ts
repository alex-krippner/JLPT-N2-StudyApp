import { createSlice, Dispatch } from "@reduxjs/toolkit";
import accountService, { Account } from "./accountService";

const accountSlice = createSlice({
  name: "accounts",
  initialState: [],
  reducers: {
    getAll(state, action) {
      return action.payload.accounts;
    },
    getById(state, action) {
      const { account } = action.payload;
      return state.map((a) => (a.id === account.id ? account : a));
    },
    create(state, action) {
      return [...state, action.payload.account];
    },
  },
});

const { getAll, getById, create } = accountSlice.actions;

export const getAllAccounts = () => {
  return async (dispatch: Dispatch) => {
    const accounts = await accountService.getAll();
    dispatch(getAll({ accounts }));
  };
};

export const getAccountById = (id: string) => async (
  dispatch: Dispatch,
) => {
  const account = await accountService.getById(id);
  dispatch(getById({ account }));
};

export const createAccount = (account: Account) => async (
  dispatch: Dispatch,
) => {
  const newAccount = await accountService.create(account);
  dispatch(create({ newAccount }));
};

export default accountSlice.reducer;
