import { Component, NgModule, OnDestroy, OnInit } from "@angular/core";
import { UserData } from "@interfaces/user.interface";
import { UserService } from "@services/general/user.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"],
})
export class TableComponent implements OnInit, OnDestroy {
  public users: UserData[];
  public searchStr: string = "";
  public uSub: Subscription;
  public rSub: Subscription;
  toggle = true;
  table = true;
  constructor(private userService: UserService) {}

  remove(id: string) {
    this.rSub = this.userService.remove(id).subscribe(() => {
      this.users = this.users.filter((user) => user.id !== id);
    });
  }

  ngOnInit() {
    this.uSub = this.userService.getAll().subscribe((users) => {
      this.users = users;
    });
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
