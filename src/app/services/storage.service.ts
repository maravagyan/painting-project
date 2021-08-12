import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root'})

  export class StorageService {
    constructor() {}
    public retrieve(key: string): any {
        const item = localStorage.getItem(key);

        if (item && item !== 'undefined') {
            return JSON.parse(item);
        }
        return;
    }

    public remove(key: string): any {
      localStorage.removeItem(key);
    }

    public store(key: string, value: any): any {
      localStorage.setItem(key, JSON.stringify(value));
    }
}