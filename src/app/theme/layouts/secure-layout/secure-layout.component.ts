import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-secure-layout',
  templateUrl: './secure-layout.component.html',
  styleUrls: ['./secure-layout.component.scss'],
})
export class SecureLayoutComponent  implements OnInit {

  @Output() onMenuChange = new EventEmitter<boolean>();

  

  @Input() menuActive: boolean;

  constructor() { }

  ngOnInit() {}

}
