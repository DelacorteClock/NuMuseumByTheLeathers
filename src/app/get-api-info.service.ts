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
    public userRegistration(userDetails: any): Observable<any> {
        console.log(userDetails);
        return this.http.post(apiUrl + 'users', userDetails).pipe(catchError(this.handleError));
    }
    public userLogin(userDetails: any): Observable<any> {
        return this.http.post(apiUrl + 'login', userDetails).pipe(catchError(this.handleError)); 
    }
    public getAllItems(): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.get(apiUrl + 'collection', {headers: new HttpHeaders({Authorization: 'Bearer ' + token})}).pipe(map(this.extractResponseInfo), catchError(this.handleError));
    }
    public getItemWithTitle(title: string): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.get(apiUrl + 'collection/title/' + title, {headers: new HttpHeaders({Authorization: 'Bearer ' + token})}).pipe(map(this.extractResponseInfo), catchError(this.handleError));
    }
    public getItemWithId(id: string): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.get(apiUrl + 'collection/id/' + id, {headers: new HttpHeaders({Authorization: 'Bearer ' + token})}).pipe(map(this.extractResponseInfo), catchError(this.handleError));
    }
    public getArtist(name: string): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.get(apiUrl + 'artists/name/' + name, {headers: new HttpHeaders({Authorization: 'Bearer ' + token})}).pipe(map(this.extractResponseInfo), catchError(this.handleError));
    }
    public getDepartment(id: string): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.get(apiUrl + 'departments/id/' + id, {headers: new HttpHeaders({Authorization: 'Bearer ' + token})}).pipe(map(this.extractResponseInfo), catchError(this.handleError));
    }
    public getUser(): Observable<any> {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        return this.http.get(apiUrl + 'users/username/' + user.userUsername, {headers: new HttpHeaders({Authorization: 'Bearer ' + token})}).pipe(map(this.extractResponseInfo), catchError(this.handleError));
    }
    public getUserFavourites(): Observable<any> {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        return this.http.get(apiUrl + 'users/username/' + user.userUsername, {headers: new HttpHeaders({Authorization: 'Bearer ' + token})}).pipe(map(this.extractResponseInfo), map((info) => {info.userFavourites}), catchError(this.handleError));
    }
    public postUserFavourite(fav: string): Observable<any> {
        const token = localStorage.getItem('token');
        var user = JSON.parse(localStorage.getItem('user') || '{}');
        user.userFavourites.push(fav);
        localStorage.setItem('user', JSON.stringify(user));
        return this.http.post(apiUrl + 'users/username/' + user.userUsername + '/favitem/' + fav, {headers: new HttpHeaders({Authorization: 'Bearer ' + token})}).pipe(map(this.extractResponseInfo), catchError(this.handleError));
    }
    public deleteUserFavourite(fav: string): Observable<any> {
        const token = localStorage.getItem('token');
        var user = JSON.parse(localStorage.getItem('user') || '{}');
        user.userFavourites.filter((id: string) => {id !== fav});
        localStorage.setItem('user', JSON.stringify(user));
        return this.http.delete(apiUrl + 'users/username/' + user.userUsername + '/favitem/' + fav, {headers: new HttpHeaders({Authorization: 'Bearer ' + token})}).pipe(map(this.extractResponseInfo), catchError(this.handleError));
    }
    public editUser(newInfo: any): Observable<any> {
        const token = localStorage.getItem('token');
        var user = JSON.parse(localStorage.getItem('user') || '{}');
        return this.http.put(apiUrl + 'users/username/' + user.userUsername, newInfo, {headers: new HttpHeaders({Authorization: 'Bearer ' + token})}).pipe(map(this.extractResponseInfo), catchError(this.handleError));
    }
    public deleteUser(): Observable<any> {
        const token = localStorage.getItem('token');
        var user = JSON.parse(localStorage.getItem('user') || '{}');
        return this.http.delete(apiUrl + 'users/username/' + user.userUsername, {headers: new HttpHeaders({Authorization: 'Bearer ' + token})}).pipe(catchError(this.handleError));
    }
    private extractResponseInfo(res: any): any {
        const body = res;
        return body || {};
    }
    private handleError(error: HttpErrorResponse): any {
        if (error.error instanceof ErrorEvent) {
            console.error('ERROR ERROR: ', error.error.message);
        } else {
            console.error(`Error code ${error.status} with body ${error.error}`);
            return throwError(() => {new Error('An issue occurred...')});
        }
    }
}
