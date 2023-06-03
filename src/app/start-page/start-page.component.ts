import {Component, OnInit} from '@angular/core';
import {UserRegistrationFormComponent} from '../user-registration-form/user-registration-form.component';
import {UserLoginFormComponent} from '../user-login-form/user-login-form.component';
import {MatDialog} from '@angular/material/dialog'; 
import {Router} from '@angular/router';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss']
})
export class StartPageComponent implements OnInit {
        title = 'NuMuseumByTheLeathers';
        constructor(public dialogue: MatDialog, public router: Router) {}
        ngOnInit(): void {
            this.tokenExists();
        }
        openUserRegistrationDialogue(): void {
            this.dialogue.open(UserRegistrationFormComponent, {width: '350px'});
        }
        openUserLoginDialogue(): void {
            this.dialogue.open(UserLoginFormComponent, {width: '350px'});
        }
        //Redirect to collection if token exists
        tokenExists(): void {
            if (localStorage.getItem('token')) {this.router.navigate(['collection']);};
        }
}
