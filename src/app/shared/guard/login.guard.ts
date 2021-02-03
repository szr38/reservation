import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { InformationService } from 'src/app/services/information.service';

@Injectable({
  providedIn: 'root'
})


export class LoginGuard implements CanActivate, CanDeactivate<unknown> {

  auth:boolean;

  constructor(private service:  InformationService, private _router:Router){
    this.auth=this.service.getAuth();
  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.auth==false){
      alert('Please log in first');
      this._router.navigateByUrl('login')
    }
    return this.auth;
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  
}
