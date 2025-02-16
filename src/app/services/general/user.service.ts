import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import {  CountsActive, FbCreateResponse, LoginOffice, SessionInterface, UserData } from "@interfaces/user.interface";
import { map, Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class UserService {
    constructor(private http: HttpClient ){}


    createUser(user: UserData): Observable<UserData>{
        return this.http.post<UserData>(`${environment.fireBaseDBurl}/users.json`, user)
        .pipe(map((response: FbCreateResponse) => {
            return {
                ...user,
                id: response.name
            }
        }))
    }
    createLogin(userId: string, login: LoginOffice): Observable<LoginOffice> {
        return this.http.put<LoginOffice>(`${environment.fireBaseDBurl}/users/${userId}/login.json`, login);
    }
    
    createSessionData(userId: string, session: SessionInterface): Observable<SessionInterface> {
        return this.http.put<SessionInterface>(`${environment.fireBaseDBurl}/users/${userId}/session.json`, session);
    }
    
    //  // Функція для збереження лічильників
    // saveCounts(userId: string, coutn: CountsActive): Observable<CountsActive> {
    //    return this.http.put<CountsActive>(`${environment.fireBaseDBurl}/statistic/${userId}/statistic.json`, coutn);
    // }

    initializeCounts(): void {
        this.getCounts().subscribe((counts) => {
          if (!counts) {
            const defaultCounts: CountsActive = { activeCount: 0, passiveCount: 0 };
            this.updateCounts(defaultCounts).subscribe();
          }
        });
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

    getUserById(id: string): Observable<UserData>{
        return this.http.get<UserData>(`${environment.fireBaseDBurl}/users/${id}.json`)
        .pipe(map((user: UserData) => {
            return {
                ...user,
                id,
            }
        }))
    }
    
    getLoginById(id: string): Observable<LoginOffice> {
        return this.http.get<LoginOffice>(`${environment.fireBaseDBurl}/users/${id}/login.json`);
    }

    getSessionById(id: string): Observable<SessionInterface> {
        return this.http.get<SessionInterface>(`${environment.fireBaseDBurl}/users/${id}/session.json`);
    }

        // Отримати глобальний лічильник
        getCounts(): Observable<CountsActive> {
            return this.http.get<CountsActive>(`${environment.fireBaseDBurl}/counts.json`);
        }
    
    getByPhone(phone: number): Observable<UserData | null> {
        return this.http
          .get<{ [key: number]: UserData }>(`${environment.fireBaseDBurl}/users.json`)
          .pipe(
            map((users) => {
              if (!users) return null;
      
              // Шукаємо користувача з таким же номером телефону
              const foundUser = Object.values(users).find(user => user.telephone === phone);
              return foundUser || null;
            })
          );
    }
      
    
    updateUser(user: UserData): Observable<UserData>{
        return this.http.patch<UserData>(`${environment.fireBaseDBurl}/users/${user.id}.json`, user);
    }
        // Оновити глобальний лічильник
    updateCounts(counts: CountsActive): Observable<CountsActive> {
        return this.http.put<CountsActive>(`${environment.fireBaseDBurl}/counts.json`, counts);
    }

    
    remove(id: string): Observable<void> {
        return this.http.delete<void>(`${environment.fireBaseDBurl}/users/${id}.json`)
    }



   

}
