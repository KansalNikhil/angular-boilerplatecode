import { Component, Input } from '@angular/core';
import { apptitle } from '../../../utils/appsettings';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule,MatToolbarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() title!: string;

  constructor() {
  }

  toggleNav() {
    const sidenav = document.getElementById('sidenav');
    const sidebartbn = document.getElementById('sidebarbtn');
    // console.log(sidenav);
    sidenav?.classList.toggle('open');
    sidebartbn?.classList.toggle('open');
  }
}
