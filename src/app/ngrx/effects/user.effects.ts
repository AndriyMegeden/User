import { Injectable } from "@angular/core";
import { createEffect, ofType, Actions } from "@ngrx/effects";
import { UserService } from "@services/general/user.service";
import {
  createLogin,
  createLoginFailure,
  createLoginSuccess,
  createSession,
  createSessionFailure,
  createSessionSuccess,
  createUser,
  createUserFailure,
  createUserSuccess,
  loadUserFailure,
  loadUsers,
  loadUserSuccess,
} from "../actions/user.actions";
import { catchError, map, mergeMap, of, switchMap } from "rxjs";

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      mergeMap(() =>
        this.userService.getAll().pipe(
          map((users) => loadUserSuccess({ users })),
          catchError((error) => of(loadUserFailure({ error: error.message })))
        )
      )
    )
  );

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createUser),
      switchMap(({ user }) =>
        this.userService.createUser(user).pipe(
          map((newUser) => createUserSuccess({ user: newUser })),
          catchError((error) => of(createUserFailure({ error })))
        )
      )
    )
  );
  createLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createLogin),
      switchMap(({ userId, login }) =>
        this.userService.createLogin(userId, login).pipe(
          map((loginResponse) => createLoginSuccess({ login: loginResponse })),
          catchError((error) => of(createLoginFailure({ error: error.message })))
        )
      )
    )
  );

  createSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createSession),
      switchMap(({ userId, session }) =>
        this.userService.createSessionData(userId, session).pipe(
          map((sessionResponse) => createSessionSuccess({ session: sessionResponse })),
          catchError((error) => of(createSessionFailure({ error: error.message })))
        )
      )
    )
  );
  
  

  
}
