import {Component, OnInit} from '@angular/core';
import {GetApiInfoService} from '../get-api-info.service'
import {Router} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog'; 
import {InfoBoxComponent} from '../info-box/info-box.component';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent {
    items: any[] = [];
    //favourites: any[] = [];
    loading: boolean = true;
    constructor(public getApiInfo: GetApiInfoService, public router: Router, public dialogue: MatDialog) {};
    ngOnInit(): void {
        this.getItems();
    }
    /**
    * Get all collection items with getAllItems() from GetApiInfoService and stop page loading message
    * @returns Collection info in json format
    */
    getItems(): any {
        this.getApiInfo.getAllItems().subscribe((res: any) => {
            this.items = res;
            console.log(this.items);
            this.loading = false;
            return this.items;
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
    * Check item favourite status thru GetApiInfoService
    * @param uuid - The uuid of an item
    * @returns Whether the item is in the user favourites array
    */
    isFavourite(uuid: string): boolean {
        return this.getApiInfo.isFavourite(uuid);
    }
    /**
    * Post user favourite thru GetApiInfoService
    * @param uuid - The uuid of an item
    */
    addFavourite(uuid: string): void {
        this.getApiInfo.postUserFavourite(uuid).subscribe(function (res) {});
    }
    /**
    * Delete user favourite thru GetApiInfoService
    * @param uuid - The uuid of an item
    */
    deleteFavourite(uuid: string): void {
        this.getApiInfo.deleteUserFavourite(uuid).subscribe(function (res) {});
    }
    /**
    * Logout user by clearing user info and token from localstorage and then going to login page
    */
    logout(): void {
        localStorage.clear();
        this.linkTo('start');
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
