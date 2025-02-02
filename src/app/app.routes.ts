import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
    {
        path: 'portal',
        component: DashboardComponent,
        children:[
            {
                path: 'profile',
                component: ProfileComponent
            }
        ]
    },
    {
        path: '',
        component: LoginComponent
    },
    {
        path: '**',
        component: NotfoundComponent
    }    
];
