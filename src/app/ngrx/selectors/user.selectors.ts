import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "../reducers/user.reducer";

export const selectUserState = createFeatureSelector<UserState>("userState");

export const selectUsers = createSelector(
  selectUserState,
  (state: UserState) => state.users
);

export const selectError = createSelector(
  selectUserState,
  (state: UserState) => state.error
);
