import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserData } from '@interfaces/user.interface';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent  implements OnInit {

  form: FormGroup

  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      surname: new FormControl(null, Validators.required),
      telephone: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      adress: new FormControl(null, Validators.required),
      textarea: new FormControl(null, Validators.required)
    })
  }

  submit(){
    if(this.form.invalid){
      return
    }
    const post: UserData ={
      name: this.form.value.name,
      surname: this.form.value.surname,
      telephone: this.form.value.telephone,
      email: this.form.value.email,
      adress: this.form.value.adress,
      textarea: this.form.value.textarea
    }
  }

}
