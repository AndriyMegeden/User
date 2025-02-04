import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import {  FbCreateResponse, UserData } from "@interfaces/user.interface";
import { map, Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class UserService {
    constructor(private http: HttpClient ){}


    create(user: UserData): Observable<UserData>{
        return this.http.post<UserData>(`${environment.fireBaseDBurl}/users.json`, user)
        .pipe(map((response: FbCreateResponse) => {
            return {
                ...user,
                id: response.name
            }
        }))
    }
    //виконує HTTP-запит до Firebase, отримує список користувачів у вигляді об'єкта, 
    // перетворює його у масив і повертає у вигляді Observable<UserData[]>
    getAll(): Observable<UserData[]>{
        return this.http.get(`${environment.fireBaseDBurl}/users.json`)
        .pipe(map((responce: {[key: string]: any}) => {
            return Object
            .keys(responce)
            .map(key => ({
                ...responce[key],
                id: key
            }))
        }))
    }

    remove(id: string): Observable<void> {
        return this.http.delete<void>(`${environment.fireBaseDBurl}/users/${id}.json`)
    }

}
