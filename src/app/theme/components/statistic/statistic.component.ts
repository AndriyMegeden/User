import { Component, OnInit } from "@angular/core";
import { CountsActive } from "@interfaces/user.interface";
import { UserService } from "@services/general/user.service";
import { Color, ScaleType } from "@swimlane/ngx-charts";
import { Observable } from "rxjs";

@Component({
  selector: "app-statistic",
  templateUrl: "./statistic.component.html",
  styleUrls: ["./statistic.component.scss"],
})
export class StatisticComponent implements OnInit {
  counts$: Observable<CountsActive | null>;
  public legendTitle: string = '';
  // Дані для графіка
  chartData: any[] = [];

  // Опції стилю
  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal, 
    domain: ['#4CAF50', '#F44336']
  };

  getColor(name: string): string {
    const index = this.chartData.findIndex(d => d.name === name);
    return this.colorScheme.domain[index] || '#000';
  }
  
  
  constructor(public userService: UserService) {}

  ngOnInit(): void {
    this.userService.initializeCounts();
    this.counts$ = this.userService.getCounts();

    this.counts$.subscribe((counts) => {
      if (counts) {
        this.chartData = [
          { name: "Active", value: counts.activeCount },
          { name: "Passive", value: counts.passiveCount },
        ];
      }
    });
  }
}
