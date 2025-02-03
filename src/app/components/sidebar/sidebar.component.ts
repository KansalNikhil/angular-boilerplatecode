import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { apptitle } from '../../../utils/appsettings';
import { authkey } from '../../../utils/appsettings';
import { UserData } from '../../models/auth-model';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [MatIconModule, MatCardModule, RouterLink, MatButtonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit{

  appTitle:string = apptitle;
  userData:string|null = "";
  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private router: Router
  ) {}
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.userData = sessionStorage.getItem(authkey);
      // ...
    }
    // console.log(this.userData);
  }

  toggleNav() {
    const sidenav = document.getElementById('sidenav');
    const sidebartbn = document.getElementById('sidebarbtn');
    // console.log(sidenav);
    sidenav?.classList.toggle('open');
    sidebartbn?.classList.toggle('open');
  }

  logout() {
    this.router.navigate(['/']);
  }

}
