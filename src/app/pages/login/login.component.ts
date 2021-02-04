import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { InformationService } from 'src/app/services/information.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  form: FormGroup;
  hide = true;
  flagButton = false;
  emails:string[]=[];


  constructor(private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private service: InformationService,
    private _router: Router,) {
      this.serviceInforUser();
    this.form = this.fb.group({
      email: ['Sincere@april.biz', [Validators.required, Validators.email]],
      password: ['123', Validators.required]
    });
  }


  ngOnInit(): void {
  }

  async login() {
    this.flagButton = true;
    if (this.form.valid === false) {
      this.openSnackBar('Please fill out the form');
      this.flagButton = false;
      return false;
    } else {
      let auth = false;
      auth = await this.service.login(this.form.get('email')!.value, this.form.get('password')!.value);
      if (auth === true) {
        this._router.navigateByUrl("/calendar");
      } else {
        this.flagButton = false;
        this.openSnackBar('Error en datos');
      }
    }
    return true;
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 2500,
    });
  }

  logOut(){
    this.service.logOut();
  }

  serviceInforUser(){
    let temp:string[]=[];
    this.service.getUsers().subscribe((res:any[]) => {
      res.forEach(element => {
        temp.push(element.email);
      });
      this.emails=temp;
      
    }, (err:any) => {
      console.log("ERRor login", err)
    });
  }

}
