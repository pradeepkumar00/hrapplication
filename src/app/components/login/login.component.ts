import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, ProfileService, RestService } from 'src/app/core/services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: any
  password: any

  isLoading=false
  constructor(private restService: RestService, private authService: AuthService, private router: Router, private profileService: ProfileService){

  }
  login(){
    this.isLoading=true
    this.restService.post(environment.API_HOST+'/token',{email: this.email, password: this.password}).subscribe((res: any)=>{
      console.log(res)
      if(res.access){
        this.isLoading=false
        this.authService.setAuthToken(res.access)
        this.profileService.setProfile(res.user)
        this.authService.setIsAuthenticated(true);
        this.router.navigate(['/'])
      }
    }, err=>{
      this.isLoading=true
      this.email=null
      this.password=null
    })
  }
}
