import { Injectable } from "@angular/core";
import { createEffect, ofType, Actions } from "@ngrx/effects";
import { UserService } from "@services/general/user.service";
import {
  loadUserFailure,
  loadUsers,
  loadUserSuccess,
} from "../actions/user.actions";
import { catchError, map, mergeMap, of } from "rxjs";

@Injectable()
export class UserEffects {
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

  constructor(private actions$: Actions, private userService: UserService) {}
}
