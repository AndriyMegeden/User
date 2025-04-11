// import { Injectable } from "@angular/core";
// import { createEffect, ofType, Actions } from "@ngrx/effects";
// import { UserService } from "@services/general/user.service";
// import {
//   createLogin,
//   createLoginFailure,
//   createLoginSuccess,
//   createSession,
//   createSessionFailure,
//   createSessionSuccess,
//   createUser,
//   createUserFailure,
//   createUserSuccess,
//   loadUserFailure,
//   loadUsers,
//   loadUserSuccess,
// } from "../actions/user.actions";
// import { catchError, map, mergeMap, of, switchMap } from "rxjs";

// @Injectable()
// export class UserEffects {
//   constructor(private actions$: Actions, private userService: UserService) {}
//   loadUsers$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(loadUsers),
//       mergeMap(() =>
//         this.userService.getAll().pipe(
//           map((users) => loadUserSuccess({ users })),
//           catchError((error) => of(loadUserFailure({ error: error.message })))
//         )
//       )
//     )
//   );

//   createUser$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(createUser),
//       switchMap(({ user }) =>
//         this.userService.createUser(user).pipe(
//           map((newUser) => createUserSuccess({ user: newUser })),
//           catchError((error) => of(createUserFailure({ error })))
//         )
//       )
//     )
//   );
//   createLogin$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(createLogin),
//       switchMap(({ userId, login }) =>
//         this.userService.createLogin(userId, login).pipe(
//           map((loginResponse) => createLoginSuccess({ login: loginResponse })),
//           catchError((error) => of(createLoginFailure({ error: error.message })))
//         )
//       )
//     )
//   );

//   createSession$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(createSession),
//       switchMap(({ userId, session }) =>
//         this.userService.createSessionData(userId, session).pipe(
//           map((sessionResponse) => createSessionSuccess({ session: sessionResponse })),
//           catchError((error) => of(createSessionFailure({ error: error.message })))
//         )
//       )
//     )
//   );
  
  

  
// }


import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  createUser,
  createUserSuccess,
  createUserFailure,
  createLogin,
  createSession,
  updateCounts,
  loadUsers,
  loadUserSuccess,
  loadUserFailure,
} from '../actions/user.actions';

import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { UserService } from '@services/general/user.service';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private store: Store
  ) {}

// загрузити дані на сторінку 
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




  // Створення користувача
  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createUser),
      switchMap(({ user, login, session }) =>
        this.userService.createUser(user).pipe(
          map((newUser) => {
            // Зберігаємо userId локально (як і раніше)
            localStorage.setItem('userId', newUser.id);

            // Якщо є логін - диспатчимо створення логіна
            if (login) {
              this.store.dispatch(
                createLogin({ userId: newUser.id, login })
              );
            }

            // Якщо є сесія - диспатчимо створення сесії
            if (session) {
              this.store.dispatch(
                createSession({ userId: newUser.id, session })
              );

              // Оновлюємо лічильники
              this.store.dispatch(updateCounts({ session }));
            }

            return createUserSuccess({ user: newUser });
          }),
          catchError((error) => of(createUserFailure({ error })))
        )
      )
    )
  );

  // Створення логіна
  createLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createLogin),
      mergeMap(({ userId, login }) =>
        this.userService.createLogin(userId, login).pipe(
          map(() => ({ type: '[User] Create Login Success' })),
          catchError((error) =>
            of({ type: '[User] Create Login Failure', error })
          )
        )
      )
    )
  );

  // Створення сесії
  createSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createSession),
      mergeMap(({ userId, session }) =>
        this.userService.createSessionData(userId, session).pipe(
          map(() => ({ type: '[User] Create Session Success' })),
          catchError((error) =>
            of({ type: '[User] Create Session Failure', error })
          )
        )
      )
    )
  );

  // Оновлення глобальних лічильників
  updateCounts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCounts),
      switchMap(({ session }) =>
        this.userService.getCounts().pipe(
          switchMap((counts) => {
            if (!counts) {
              counts = { activeCount: 0, passiveCount: 0 };
            }

            if (session?.isActive) {
              counts.activeCount++;
            } else {
              counts.passiveCount++;
            }

            return this.userService.updateCounts(counts).pipe(
              map(() => ({ type: '[User] Update Counts Success' })),
              catchError((error) =>
                of({ type: '[User] Update Counts Failure', error })
              )
            );
          })
        )
      )
    )
  );
}
