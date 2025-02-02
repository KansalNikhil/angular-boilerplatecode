import { Component } from '@angular/core';
import { appfooter } from '../../../utils/appsettings';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
    appFooter:string = appfooter
}
