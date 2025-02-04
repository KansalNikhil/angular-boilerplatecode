import { Component, Input } from '@angular/core';
import {LOGOUT_URL} from '../../../utils/constanturls';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { HttpService } from '../../http-service';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule,MatToolbarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() title!: string;
  @Input() username!: string;

  constructor(
       private router: Router,
       private httpService: HttpService
  ) {
  }

  toggleNav() {
    const sidenav = document.getElementById('sidenav');
    const sidebartbn = document.getElementById('sidebarbtn');
    // console.log(sidenav);
    sidenav?.classList.toggle('open');
    sidebartbn?.classList.toggle('open');
  }

  logout() {
    var item = sessionStorage.getItem('userdata');
    console.log(item);
    if(item != null){
      var userid = JSON.parse(item!);
      if(userid.empuid != null || userid.empuid != ""){
        this.httpService.post<string|null>(LOGOUT_URL, { empuid: userid.empuid}).subscribe(
          {
            next:(response) => {
              console.log(response);
              if(response.statuscode == 200){
                console.log(response.message);
              }
              else{
                console.log(response.error);
              }
            },
            error:(error) => {
              console.log(error);
              alert(error.error.message);
            }
          }
        );
      }
    }    
    sessionStorage.removeItem('userdata');
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
