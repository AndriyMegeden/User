import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss'],
})
export class AuthLayoutComponent implements OnInit {
  
  @Input() navbar: boolean

  constructor(
  ) {}

  ngOnInit() {}

}
