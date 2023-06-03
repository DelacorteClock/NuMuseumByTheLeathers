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
    getUser(): void {
        this.user = this.getApiInfo.getUser();
        //Format date for 2024 leap celebration year
        this.userInfo.userCelebrate = '2024' + this.user.userCelebrate.split('T')[0].split('1618')[1];
    }
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
    linkTo(suffix: string): void{
        this.router.navigate([suffix]);
    }
    logout(): void {
        localStorage.clear();
        this.router.navigate(['start']);
    }
    forceDelete(): void {
        if (prompt(`Type 'FORCE DELETE ${this.user.userUsername.toUpperCase()}' in all capital letters to permanently delete your NuMuseum account!`) === `FORCE DELETE ${this.user.userUsername.toUpperCase()}`) {
            this.getApiInfo.deleteUser().subscribe((res) => {console.log('deleted'); localStorage.clear(); this.router.navigate(['start']);}, (res) => {localStorage.clear(); this.router.navigate(['start']);});
        }
    }
}
