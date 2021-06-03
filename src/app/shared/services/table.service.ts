import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TableService {
    public observer: Observable<null>;
    private subscribers: Subscriber<null>[] = [];

    constructor() {
        this.observer = new Observable((subscriber) => {
            this.subscribers.push(subscriber);
            return () => {
                const index = this.subscribers.indexOf(subscriber);
                this.subscribers.splice(index, 1);
            };
        });
    }

    refresh() {
        this.subscribers.forEach((subscriber) => subscriber.next());
    }
    
    public get hasSubscribers(): boolean {
        return this.subscribers.length > 0;
    }
}