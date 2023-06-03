import {Component, OnInit} from '@angular/core';
import {GetApiInfoService} from '../get-api-info.service';
import {Router} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {InfoBoxComponent} from '../info-box/info-box.component';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})

export class ProfileViewComponent implements OnInit {
    user: any = {};
    favourites: any[] = [];
    constructor(public getApiInfo: GetApiInfoService, public router: Router, public dialogue: MatDialog) {}
    ngOnInit(): void {
        this.getUserInfo();
    }
    getUserInfo(): void {
        this.user = this.getApiInfo.getUser();
        var favouritesArray = this.user.userFavourites;
        var newFavourites: any[] = [];
        this.getApiInfo.getAllItems().subscribe((res: any) => {
            favouritesArray.forEach(function (label: string) {newFavourites.push(res.filter(function (itm: any) {return itm._id === label})[0])});
            this.favourites = newFavourites;
            console.log(this.favourites);
        });
    }
    linkTo(suffix: string): void{
        this.router.navigate([suffix]);
    }
    logout(): void {
        localStorage.clear();
        this.router.navigate(['start']);
    }
    deleteFavourite(uuid: string): void {
        this.getApiInfo.deleteUserFavourite(uuid).subscribe(function (res) {});
        var newFavourites: string[] = [];
        this.favourites.forEach((currentItem: any) => {if (currentItem._id !== uuid) {newFavourites.push(currentItem);}});
        this.favourites = newFavourites;
    }
    dateMake(num: string): string {
        switch(num) {
            case '01': return 'January';
            case '02': return 'February';
            case '03': return 'March';
            case '04': return 'April';
            case '05': return 'May';
            case '06': return 'June';
            case '07': return 'July';
            case '08': return 'August';
            case '09': return 'September';
            case '10': return 'October';
            case '11': return 'November';
            case '12': return 'December';
            default: return 'NO MONTH'
        }
    }
    //Details
    openDescriptionDialogue(title: string, desc: string): void {
        this.dialogue.open(InfoBoxComponent, {data: {head: title, paragraph: desc}, width: '350px'});
    }
}
