import { Component, signal } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-profile',
  imports: [MatButtonModule,MatToolbarModule,MatFormFieldModule,MatInputModule,MatSelectModule,MatExpansionModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  readonly panelOpenState = signal(false);
}
