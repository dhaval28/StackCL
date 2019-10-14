import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './services/auth-guard.service';
import { QASectionComponent } from './home/qa-section/qa-section.component';
import { UserProfileComponent } from './home/user-profile/user-profile.component';
import { DiscussionSectionComponent } from './home/discussion-section/discussion-section.component';
import { AdminControllerComponent } from './home/admin-controller/admin-controller.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService], children: [
    {
      path: 'qasection',
      component: QASectionComponent
    },
    {
      path: 'discussion',
      component: DiscussionSectionComponent
    },
    {
      path: 'profile/:userName',
      component: UserProfileComponent
    },
    {
      path: 'admin',
      component: AdminControllerComponent
    }
  ] },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
