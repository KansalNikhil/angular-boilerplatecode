import { Component, Input, OnInit } from '@angular/core';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { FooterComponent } from '../components/footer/footer.component';
import { RouterOutlet} from '@angular/router';
import { HeaderComponent } from "../components/header/header.component";
import { ActivatedRoute, Router } from '@angular/router';
import { pages } from '../models/auth-model';

@Component({
  selector: 'app-dashboard',
  imports: [SidebarComponent, RouterOutlet, FooterComponent, HeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  secondLastSegment: string = '';

  pagename = 'DASHBOARD';
  username = "user";
  role = "";
  pages : pages|null = null;

  constructor(
    private router: Router, 
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    var item = sessionStorage.getItem('userdata');
    console.log(item);
    if(item != null){
      var userid = JSON.parse(item!);
      this.username = userid.empuid;
    }
    else{
      this.router.navigate(['/']);
    } 

    this.router.events.subscribe(() => {
      const urlSegments = this.router.url.split('/').filter(segment => segment);
      this.pagename = urlSegments[urlSegments.length - 1] == '' ? 'DASHBOARD' : 
      urlSegments[urlSegments.length - 1]?.toLowerCase() == 'portal' ? 'DASHBOARD' : urlSegments[urlSegments.length - 1]?.toUpperCase();
      this.secondLastSegment = urlSegments[urlSegments.length - 2] || '';
    });
  }

  toggleNav() {
    const sidenav = document.getElementById('sidenav');
    const content = document.getElementById('content');
    // const header = document.getElementById('header');
    console.log(sidenav, content);
    sidenav?.classList.toggle('open');
    // header?.classList.toggle('shift');
    content?.classList.toggle('shift');
  }
}
