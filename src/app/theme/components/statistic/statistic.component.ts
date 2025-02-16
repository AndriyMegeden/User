import { Component, OnInit } from "@angular/core";
import { CountsActive } from "@interfaces/user.interface";
import { UserService } from "@services/general/user.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-statistic",
  templateUrl: "./statistic.component.html",
  styleUrls: ["./statistic.component.scss"],
})
export class StatisticComponent implements OnInit {
  counts$: Observable<CountsActive | null>;
  constructor(public userService: UserService) {}

  ngOnInit(): void {
    this.userService.initializeCounts();
    this.counts$ = this.userService.getCounts(); // Отримуємо дані як Observable
  }


 
}
