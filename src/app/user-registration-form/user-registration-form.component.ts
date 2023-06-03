import {Component, OnInit, Input} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {GetApiInfoService} from '../get-api-info.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'app-user-registration-form',
    templateUrl: './user-registration-form.component.html',
    styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {
    @Input() userInfo = {userForename: '', userSurname: '', userUsername: '', userCode: '', userEmail: '', userCelebrate: ''};
    constructor(
        public getApiInfo: GetApiInfoService,
        public dialogueRef: MatDialogRef<UserRegistrationFormComponent>,
        public snackBar: MatSnackBar
    ) {}
    ngOnInit(): void {}
    registerUser(): void {
        this.getApiInfo.userRegistration(this.userInfo).subscribe((res) => {console.log(res); this.dialogueRef.close(); this.snackBar.open('Registration Succeeded', 'Close', {duration: 3000});}, 
        (res) => {console.log(res); this.snackBar.open(res ? res : 'Registration Failed', 'Close', {duration: 3000});});
    }
}
