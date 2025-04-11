import { LoginOffice, SessionInterface, UserData } from '@interfaces/user.interface';
import { createAction, props } from '@ngrx/store';


export const createUser = createAction ('[User] Create User', props<{ user: UserData  }>())
export const createUserSuccess = createAction ('[User] Create User Success', props<{ user: UserData }>())
export const createUserFailure = createAction ('[User] Create Users Failure', props<{ error: string }>());

export const createLogin = createAction ('[User] Create Login', props<{  userId: string, login: LoginOffice}>())
export const createLoginSuccess = createAction ('[User] Create Login Success', props<{ login: LoginOffice }>())
export const createLoginFailure = createAction ('[User] Create Login Failure', props<{ error: string }>());

export const createSession = createAction ('[User] Create Session', props<{  userId: string, session: SessionInterface}>())
export const createSessionSuccess = createAction ('[User] Create Session Success', props<{ session: SessionInterface }>())
export const createSessionFailure = createAction ('[User] Create Session Failure', props<{ error: string }>());



export const updateUser = createAction ('[User] Update User', props<{ user: UserData }>())
export const deleteUser = createAction ('[User] Delete User', props<{ userId: UserData['id'] }>())

export const loadUsers = createAction('[User] Load Users');
export const loadUserSuccess = createAction ('[User] Load Users Success', props<{ users: UserData[] }>());
export const loadUserFailure = createAction ('[User] Load Users Failure', props<{ error: string }>());




  