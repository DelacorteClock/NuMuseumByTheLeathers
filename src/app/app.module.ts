import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {FormsModule} from '@angular/forms';
import {UserRegistrationFormComponent} from './user-registration-form/user-registration-form.component';
import {UserLoginFormComponent} from './user-login-form/user-login-form.component';
import {ItemCardComponent} from './item-card/item-card.component';
import {StartPageComponent} from './start-page/start-page.component';
import {RouterModule, Routes} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {ProfileViewComponent} from './profile-view/profile-view.component';
import {InfoBoxComponent} from './info-box/info-box.component';
import {ProfileEditComponent} from './profile-edit/profile-edit.component';

const appRoutes: Routes = [
    {path: 'start', component: StartPageComponent},
    {path: 'collection', component: ItemCardComponent},
    {path: 'profile', component: ProfileViewComponent},
    {path: 'profile/edit', component: ProfileEditComponent},
    {path: '', redirectTo: 'start', pathMatch: 'prefix'}
];

@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationFormComponent,
    UserLoginFormComponent,
    ItemCardComponent,
    StartPageComponent,
    ProfileViewComponent,
    InfoBoxComponent,
    ProfileEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSnackBarModule,
    RouterModule.forRoot(appRoutes),
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
