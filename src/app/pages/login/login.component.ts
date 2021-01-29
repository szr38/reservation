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


  constructor(private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private service: InformationService,
    private _router: Router,) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }


  ngOnInit(): void {
  }

  async login() {
    this.flagButton = true;
    if (this.form.valid === false) {
      this.openSnackBar('Por favor llenar formulario');
      this.flagButton = false;
      return false;
    } else {
      let auth = false;
      auth = await this.service.login(this.form.get('email')!.value, this.form.get('password')!.value);
      if (auth === true) {
        this.service.setAuth(true);
        this._router.navigateByUrl("/calendar");
      } else {
        this.flagButton = false;
        console.log('probando else')
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

  test() {
    console.log('auth: ', this.service.getAuth());
    this.service.getUsers().subscribe(res => {
      console.log('res de servidor',res);
    }, err => {
      console.log("ERRor get_adminEvents", err)
    });

  }

}
