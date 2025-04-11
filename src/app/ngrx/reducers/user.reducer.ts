import { LoginOffice, SessionInterface, UserData } from "@interfaces/user.interface";
import { createReducer, on } from "@ngrx/store";
import {
  createUser,
  deleteUser,
  loadUserFailure,
  loadUserSuccess,
  updateUser,
} from "../actions/user.actions";
import { error } from "console";

export interface UserState {
  users: UserData[];
  loading: boolean;
  error: string | null;
    login?: LoginOffice;   
    session?: SessionInterface;
}

export const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

export const userReducer = createReducer(
    initialState,
    on(loadUserSuccess, (state, { users }) => ({ ...state, users, error: null })),  // Завантажуємо користувачів
    on(loadUserFailure, (state, { error }) => ({ ...state, error })),  // Обробка помилки
    on(createUser, (state, { user }) => ({ ...state, users: [...state.users, user] })),  // Додаємо нового користувача до масиву
    on(updateUser, (state, { user }) => ({
        ...state,
        users: state.users.map(u => u.id === user.id ? user : u),  // Оновлюємо користувача по ID
    })),
    on(deleteUser, (state, { userId }) => ({
        ...state,
        users: state.users.filter(u => u.id !== userId),  // Видаляємо користувача по ID
    }))
);

