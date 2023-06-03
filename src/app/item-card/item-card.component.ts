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
    getItems(): void {
        this.getApiInfo.getAllItems().subscribe((res: any) => {
            this.items = res;
            console.log(this.items);
            this.loading = false;
            return this.items;
        });
    }
    linkTo(suffix: string): void{
        this.router.navigate([suffix]);
    }
    isFavourite(uuid: string): boolean {
        return this.getApiInfo.isFavourite(uuid);
    }
    addFavourite(uuid: string): void {
        this.getApiInfo.postUserFavourite(uuid).subscribe(function (res) {});
    }
    deleteFavourite(uuid: string): void {
        this.getApiInfo.deleteUserFavourite(uuid).subscribe(function (res) {});
    }
    logout(): void {
        localStorage.clear();
        this.router.navigate(['start']);
    }
    //Details
    openDescriptionDialogue(title: string, desc: string): void {
        this.dialogue.open(InfoBoxComponent, {data: {head: title, paragraph: desc}, width: '350px'});
    }
}
