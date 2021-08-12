import { Injectable } from "@angular/core";
import { HelperService } from "./helper.service";
import { StorageService } from "./storage.service";

@Injectable({ providedIn: 'root' })

export class AuthService {
    constructor(
        private storageService: StorageService,
        private helperService: HelperService
    ) {}
    
    async ResetAuthorizationData(): Promise<boolean> {
        this.storageService.store('users', {});
        this.helperService.setLoginStatus({name: '', condition: false});
        return true;
    }

    async SetAuthorizationData(userEmail: string, user: any): Promise<boolean> {
        let users = {} as any;
        users = this.storageService.retrieve('users');
        if (users && users[userEmail] === undefined) {
            users[userEmail] = user;
        } else if (users && users[userEmail]) {
            console.log('user alredy exist try another email');
            return false
        }
        if (users === undefined) {
            users = {};
            users[userEmail] = user;
        }
        this.storageService.store('users', users);
        return true;
    }

    async LogIn(loginData: any): Promise<boolean> {
        let users = this.storageService.retrieve('users');
        if (users[loginData.email].email === loginData.email && users[loginData.email].password === loginData.password) {
            this.helperService.setLoginStatus({name: loginData.email, condition: true});
            this.storageService.store('isLoggined', {name: loginData.email, condition: true});
            return true;
        } else {
            return false;
        }
    }

    async LogOut(): Promise<boolean> {
        this.helperService.setLoginStatus(false);
        this.storageService.store('isLoggined', {name: '', condition: false});
        return true;
    }

}