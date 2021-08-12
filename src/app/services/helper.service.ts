import { Injectable } from "@angular/core";
import { Subject } from "rxjs/internal/Subject";

@Injectable({ providedIn: 'root' })

export class HelperService {
    public isLoggined = new Subject<any>();
    isLoggined$ = this.isLoggined.asObservable();

    constructor() {}

    setLoginStatus(state: any): void {
        this.isLoggined.next(state);
    }
}