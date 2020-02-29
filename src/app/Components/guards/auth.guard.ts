import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, RouterEvent } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
constructor(public router:Router){}

  canActivate(): boolean  {
      if(window.sessionStorage.getItem("AuthToken")!=null){
        console.log("Entra")
        return true;
      } else {
        this.router.navigateByUrl('/login');
        return false;
      } 
 
  }
  
  
}
