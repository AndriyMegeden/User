import { Pipe, PipeTransform } from "@angular/core";
import { UserData } from "@interfaces/user.interface";

@Pipe({
    name: 'searchUser'
})
export class SearchPipe implements PipeTransform{
    transform(users: UserData[], search = ''): UserData[] {
        if(!search.trim()){
            return users
        }
        return users.filter( user => {
            return user.adress.toLowerCase().includes(search.toLowerCase())
        })
    }

}