import { Component, NgModule, OnDestroy, OnInit } from "@angular/core";
import { SessionInterface, UserData } from "@interfaces/user.interface";
import { OverlayEventDetail } from "@ionic/core";
import { UserService } from "@services/general/user.service";
import { map, Observable, Subscription, take } from "rxjs";
import {
  selectError,
  selectUsers,
} from "src/app/ngrx/selectors/user.selectors";
import { Store } from "@ngrx/store";
import { deleteUser, loadUsers } from "src/app/ngrx/actions/user.actions";
import { UserState } from "src/app/ngrx/reducers/user.reducer";
@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"],
})
export class TableComponent implements OnInit, OnDestroy {
  public users: UserData[] = []; ///////////
  public session: SessionInterface[] = [];
  public searchStr: string = "";
  public uSub: Subscription;
  public rSub: Subscription;
  public isAlertOpen = false;
  userIdToRemove: string | null = null;
  toggle = true;
  table = true;
  constructor(
    private userService: UserService,
    private store: Store<UserState>
  ) {}

  users$: Observable<UserData[]> = this.store.select(selectUsers);
  error$: Observable<string | null> = this.store.select(selectError);

  public alertButtons = [
    {
      text: "Cancel",
      role: "cancel",
      handler: () => {
        console.log("Alert canceled");
      },
    },
    {
      text: "OK",
      role: "confirm",
      handler: () => {
        console.log("Alert confirmed");
      },
    },
  ];

  openAlert(userId: string) {
    this.userIdToRemove = userId;
    this.isAlertOpen = true; // Зберігаємо ID користувача перед відкриттям алерта
    console.log(this.isAlertOpen);
  }

  setResult(event: CustomEvent<OverlayEventDetail>) {
    this.isAlertOpen = false;
    if (event.detail.role === "confirm" && this.userIdToRemove) {
      this.remove(this.userIdToRemove);
      this.userIdToRemove = null; // Очищаємо змінну після видалення
    }
    console.log(`Dismissed with role: ${event.detail.role}`);
  }

  remove(id: string) {
    // Викликаємо сервіс для видалення користувача
    this.userService.remove(id).subscribe(() => {
      console.log("Викликаємо сервіс для видалення користувача");
      // Оновлення лічильників
      this.users$
        .pipe(
          take(1),
          map((users) => users.find((user) => user.id === id))
        )
        .subscribe((sessionUser) => {
          console.log("Оновлення лічильників");
          if (sessionUser) {
            const isActive = sessionUser.session.isActive;
            this.userService.getCounts().subscribe((counts) => {
              if (isActive) {
                counts.activeCount = Math.max(0, counts.activeCount - 1);
              } else {
                counts.passiveCount = Math.max(0, counts.passiveCount - 1);
              }

              // Оновлюємо лічильники
              this.userService.updateCounts(counts).subscribe(() => {
                console.log("Лічильники успішно оновлено.");
              });
            });
          }
        });
         // Диспатчимо action для видалення користувача з Store
          console.log('Диспатчимо action для видалення користувача з Store')
      this.store.dispatch(deleteUser({ userId: id }));
    });
  }

  // remove(id: string) {
  //   this.rSub = this.userService.remove(id).subscribe(() => {

  //     this.users = this.users.filter((user) => user.id !== id);
  //   });

  //   const sessionUser = this.users.find((user) => user.id === id);
  //   const isActive = sessionUser.session.isActive;
  //   this.userService.getCounts().subscribe((counts) => {
  //     if (isActive) {
  //       counts.activeCount = Math.max(0, counts.activeCount - 1);
  //     } else {
  //       counts.passiveCount = Math.max(0, counts.passiveCount - 1);
  //     }
  //     this.userService.updateCounts(counts).subscribe(() => {
  //       console.log("Лічильники успішно оновлено.");
  //     });
  //   });
  // }

  ngOnInit() {
    // this.uSub = this.userService.getAll().subscribe((users) => {
    //   this.users = users;
    // });

    this.store.dispatch(loadUsers());
  }

  ngOnDestroy(): void {
    if (this.uSub) {
      this.uSub.unsubscribe();
    }
    if (this.rSub) {
      this.rSub.unsubscribe();
    }
  }
}
