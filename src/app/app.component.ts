import {Component} from '@angular/core';
import {UserRegistrationFormComponent} from './user-registration-form/user-registration-form.component';
import {UserLoginFormComponent} from './user-login-form/user-login-form.component';
import {MatDialog} from '@angular/material/dialog'; 

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'NuMuseumByTheLeathers';
    constructor(public dialogue: MatDialog) {}
    openUserRegistrationDialogue(): void {
        this.dialogue.open(UserRegistrationFormComponent, {width: '350px'});
    }
    openUserLoginDialogue(): void {
        this.dialogue.open(UserLoginFormComponent, {width: '350px'});
    }
}
