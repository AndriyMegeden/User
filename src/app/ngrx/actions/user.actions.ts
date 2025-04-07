import { UserData } from '@interfaces/user.interface';
import { createAction, props } from '@ngrx/store';

export const createUser = createAction ('[User] Create User', props<{ user: UserData }>())
export const updateUser = createAction ('[User] Update User', props<{ user: UserData }>())
export const deleteUser = createAction ('[User] Delete User', props<{ userId: UserData['id'] }>())

export const loadUsers = createAction('[User] Load Users');
export const loadUserSuccess = createAction ('[User] Load Users Success', props<{ users: UserData[] }>());
export const loadUserFailure = createAction ('[User] Load Users Failure', props<{ error: string }>());