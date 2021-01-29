import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { LoginComponent } from './pages/login/login.component';


const routes: Routes = [
  {path:'',component:LoginComponent},
  // { path: '',   redirectTo: '/first-component', pathMatch: 'full' }
  {path:'calendar',component:CalendarComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
