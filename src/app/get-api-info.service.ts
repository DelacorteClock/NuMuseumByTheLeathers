import {Injectable} from '@angular/core';
import {map, catchError} from 'rxjs/operators';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';

const apiUrl = 'https://rubbersuitleatherpantsspacesuit.onrender.com/';

@Injectable({
  providedIn: 'root'
})
export class GetApiInfoService {
    constructor(private http: HttpClient) {
    }
    /**
    * Posts user info to database
    * @param userDetails - A json containing user personal info
    * @returns Request to put user info into database
    */
    public userRegistration(userDetails: any): Observable<any> {
        console.log(userDetails);
        return this.http.post(apiUrl + 'users', userDetails).pipe(catchError(this.handleError));
    }
    /**
    * Posts user login info in exchange fore a token
    * @param userDetails - A json containing username and code
    * @returns Request to put user info into database which gives a token
    */
    public userLogin(userDetails: any): Observable<any> {
        return this.http.post(apiUrl + 'login', userDetails).pipe(catchError(this.handleError)); 
    }
    /**
    * Get all collection items
    * @returns Request to get json with info about all items
    */
    public getAllItems(): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.get(apiUrl + 'collection', {headers: new HttpHeaders({Authorization: 'Bearer ' + token})}).pipe(map(this.extractResponseInfo), catchError(this.handleError));
    }
    /**
    * Get collection item based on name
    * @param - title - The name of the item about which info is wanted
    * @returns Request to get json with info about the item
    */
    public getItemWithTitle(title: string): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.get(apiUrl + 'collection/title/' + title, {headers: new HttpHeaders({Authorization: 'Bearer ' + token})}).pipe(map(this.extractResponseInfo), catchError(this.handleError));
    }
    /**
    * Get collection item based on id
    * @param - id - The id of the item about which info is wanted
    * @returns Request to get json with info about the item
    */
    public getItemWithId(id: string): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.get(apiUrl + 'collection/id/' + id, {headers: new HttpHeaders({Authorization: 'Bearer ' + token})}).pipe(map(this.extractResponseInfo), catchError(this.handleError));
    }
    /**
    * Get artist based on name
    * @param - name - The name of the artist about which info is wanted
    * @returns Request to get json with info about the artist
    */
    public getArtist(name: string): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.get(apiUrl + 'artists/name/' + name, {headers: new HttpHeaders({Authorization: 'Bearer ' + token})}).pipe(map(this.extractResponseInfo), catchError(this.handleError));
    }
    /**
    * Get department based on id
    * @param - id - The id of the department about which info is wanted
    * @returns Request to get json with info about the department
    */
    public getDepartment(id: string): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.get(apiUrl + 'departments/id/' + id, {headers: new HttpHeaders({Authorization: 'Bearer ' + token})}).pipe(map(this.extractResponseInfo), catchError(this.handleError));
    }
    /**
    * Get user info
    * @returns Info about user from localstorage in json format
    */
    public getUser(): Observable<any> {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        return user;
    }
    /**
    * Get user favourites
    * @returns Array of user favourites from localstorage in json format
    */
    public getUserFavourites(): Observable<any> {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        return user.userFavourites;
    }
    /**
    * Check item favourite status
    * @param fav - The uuid of an item
    * @returns Whether the item is in the user favourites array
    */
    public isFavourite(fav: string): boolean {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        return user.userFavourites.includes(fav);
    }
    /**
    * Post user favourite
    * @param fav - The uuid of an item
    * @returns Request to post a favourite uuid to the user's favourites array
    */
    public postUserFavourite(fav: string): Observable<any> {
        const token = localStorage.getItem('token');
        var user = JSON.parse(localStorage.getItem('user') || '{}');
        user.userFavourites.push(fav);
        localStorage.setItem('user', JSON.stringify(user));
        console.log(token);
        return this.http.post(apiUrl + 'users/username/' + user.userUsername + '/favitem/' + fav, {}, {headers: new HttpHeaders({Authorization: 'Bearer ' + token})}).pipe(map(this.extractResponseInfo), catchError(this.handleError));
    }
    /**
    * Delete user favourite
    * @param fav - The uuid of an item
    * @returns Request to delete a favourite uuid from the user's favourites array
    */
    public deleteUserFavourite(fav: string): Observable<any> {
        const token = localStorage.getItem('token');
        var user = JSON.parse(localStorage.getItem('user') || '{}');
        var newFavourites: string[] = []; 
        user.userFavourites.forEach((id: string) => {if (id !== fav) {newFavourites.push(id);}});
        user.userFavourites = newFavourites;
        localStorage.setItem('user', JSON.stringify(user));
        console.log(apiUrl + 'users/username/' + user.userUsername + '/favitem/' + fav, token, user);
        return this.http.delete(apiUrl + 'users/username/' + user.userUsername + '/favitem/' + fav, {headers: new HttpHeaders({Authorization: 'Bearer ' + token})}).pipe(map(this.extractResponseInfo), catchError(this.handleError));
    }
    /**
    * Put user info edits
    * @param newInfo - Info in json format of edits to apply to user
    * @returns Request to put edits and give updated user json
    */
    public editUser(newInfo: any): Observable<any> {
        const token = localStorage.getItem('token');
        var user = JSON.parse(localStorage.getItem('user') || '{}');
        return this.http.put(apiUrl + 'users/username/' + user.userUsername, newInfo, {headers: new HttpHeaders({Authorization: 'Bearer ' + token})}).pipe(map(this.extractResponseInfo), catchError(this.handleError));
    }
    /**
    * Delete user
    * @returns Request to delete user in localstorage from database
    */
    public deleteUser(): Observable<any> {
        const token = localStorage.getItem('token');
        var user = JSON.parse(localStorage.getItem('user') || '{}');
        return this.http.delete(apiUrl + 'users/username/' + user.userUsername, {headers: new HttpHeaders({Authorization: 'Bearer ' + token})}).pipe(catchError(this.handleError));
    }
    /**
    * Extract info from response to http request
    * @param res - Body of response to http request
    * @returns Body of response if it exists or {}
    */
    private extractResponseInfo(res: any): any {
        const body = res;
        return body || {};
    }
    /**
    * Notify developer about http error in console and throw error if necessary
    * @param error - Error response to http request
    * @returns Throw of error if needed
    */
    private handleError(error: HttpErrorResponse): any {
        if (error.error instanceof ErrorEvent) {
            console.error('ERROR ERROR: ', error.error.message);
        } else {
            console.error(`Error code ${error.status} with body ${error.error}`);
            return throwError(() => {new Error('An issue occurred...')});
        }
    }
}
