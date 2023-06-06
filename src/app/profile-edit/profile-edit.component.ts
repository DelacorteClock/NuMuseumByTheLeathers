import {Component, OnInit, Input} from '@angular/core';
import {GetApiInfoService} from '../get-api-info.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})

export class ProfileEditComponent implements OnInit {
    constructor(public getApiInfo: GetApiInfoService, public snackBar: MatSnackBar, public router: Router) {}
    user: any = {}
    @Input() userInfo = {userForename: '', userSurname: '', userUsername: '', userCode: '', userEmail: '', userCelebrate: ''};
    ngOnInit(): void {
        this.getUser();
    }
    /**
    * Get user (and set its info) thru GetApiInfoService and set birthday to display
    */
    getUser(): void {
        this.user = this.getApiInfo.getUser();
        //Format date for 2024 leap celebration year
        this.userInfo.userCelebrate = '2024' + this.user.userCelebrate.split('T')[0].split('1618')[1];
    }
    /**
    * Send edited user info (editable by form) to update user thru GetApiInfoService
    */
    editUser(): void {
        var userInfo = this.userInfo;
        var userEdits = '';
        for (const [propName, propValue] of Object.entries(userInfo)) {
            if (propValue.length > 0) {
                userEdits += `"${propName}": "${propValue}",`;
            }
        }
        userEdits = `{${userEdits.slice(0, -1)}}`;
        console.log(userEdits);
        console.log(JSON.parse(userEdits));
        this.getApiInfo.editUser(JSON.parse(userEdits)).subscribe((res) => {localStorage.setItem('user', JSON.stringify(res)); this.snackBar.open('Edit Succeeded', 'Close', {duration: 3000}); this.router.navigate(['profile']);}, 
        (res) => {console.log(res); this.snackBar.open(res ? res : 'Edit Failed', 'Close', {duration: 3000});});
    }
    /**
    * Switch to NuMuseum url ending in a suffix
    * @param suffix - Suffix of url within NuMuseum site
    */
    linkTo(suffix: string): void{
        this.router.navigate([suffix]);
    }
    /**
    * Logout user by clearing user info and token from localstorage and then going to login page
    */
    logout(): void {
        localStorage.clear();
        this.linkTo('start');
    }
    /**
    * Force delete user logged in (based on localstorage) thru GetApiInfoService
    */
    forceDelete(): void {
        if (prompt(`Type 'FORCE DELETE ${this.user.userUsername.toUpperCase()}' in all capital letters to permanently delete your NuMuseum account!`) === `FORCE DELETE ${this.user.userUsername.toUpperCase()}`) {
            this.getApiInfo.deleteUser().subscribe((res) => {console.log('deleted'); localStorage.clear(); this.linkTo('start');}, (res) => {localStorage.clear(); this.linkTo('start');});
        }
    }
}
