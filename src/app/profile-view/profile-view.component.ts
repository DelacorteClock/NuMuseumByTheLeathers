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
    /**
    * Get user (and set its info) thru GetApiInfoService and fill array of user favourites
    */
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
        this.router.navigate(['start']);
    }
    /**
    * Delete user favourite thru GetApiInfoService
    * @param uuid - The uuid of an item
    */
    deleteFavourite(uuid: string): void {
        this.getApiInfo.deleteUserFavourite(uuid).subscribe(function (res) {});
        var newFavourites: string[] = [];
        this.favourites.forEach((currentItem: any) => {if (currentItem._id !== uuid) {newFavourites.push(currentItem);}});
        this.favourites = newFavourites;
    }
    /**
    * Generate name of month corresponding to two digit month number
    * @param num - Two digit (eg '01' not '1', '07' not '7') number representing month
    * @returns Name of month (with first letter capitalised) or 'NO MONTH' for bad input
    */
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
    /**
    * Open InfoBox dialogue with specific title (for head) and description (for paragraph)
    * @param title - The title to be the head of the InfoBox
    * @param desc - The description to be the paragraph of the InfoBox
    */
    openDescriptionDialogue(title: string, desc: string): void {
        this.dialogue.open(InfoBoxComponent, {data: {head: title, paragraph: desc}, width: '350px'});
    }
}
