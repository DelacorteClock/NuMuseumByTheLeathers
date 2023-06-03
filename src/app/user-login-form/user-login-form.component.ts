import {Component, OnInit, Input} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {GetApiInfoService} from '../get-api-info.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';

@Component({
    selector: 'app-user-login-form',
    templateUrl: './user-login-form.component.html',
    styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {
    @Input() userInfo = {username: '', code: ''}; 
    constructor(
        public getApiInfo: GetApiInfoService,
        public dialogueRef: MatDialogRef<UserLoginFormComponent>,
        public snackBar: MatSnackBar,
        public router: Router
    ) {}
    ngOnInit(): void {}
    loginUser(): void {
        this.getApiInfo.userLogin(this.userInfo).subscribe((res) => {
        console.log(res);
        localStorage.setItem('user', JSON.stringify(res.user));
        localStorage.setItem('token', res.token);
        this.dialogueRef.close();
        this.router.navigate(['collection']);
        this.snackBar.open('Login Succeeded', 'Close', {duration: 3000});
    }, (res) => {console.log(res); this.snackBar.open(res ? res : 'Login Failed', 'Close', {duration: 3000});});
    }
    }
