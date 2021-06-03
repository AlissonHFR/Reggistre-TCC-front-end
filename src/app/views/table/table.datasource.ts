import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ApiService } from '../../shared/services/api.service';

export class TableDataSource implements DataSource<Record<string, any>> {
    private entitySubject = new BehaviorSubject<Record<string, any>[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    public meta: Observable<any>;
    private metaSubscribers: any[] = [];

    constructor(private entityService: ApiService) {
        this.meta = new Observable((subscriber) => {
            this.metaSubscribers.push(subscriber);
            return () =>
                this.metaSubscribers.splice(
                    this.metaSubscribers.indexOf(subscriber),
                    1
                );
        });
    }

    connect(): Observable<Record<string, any>[]> {
        return this.entitySubject.asObservable();
    }

    disconnect(): void {
        this.entitySubject.complete();
        this.loadingSubject.complete();
    }

    loadEntities(page?: number, limit?: number, extra?: Record<string, string>) {
        this.loadingSubject.next(true);

        this.entityService
            .readAll()
            .pipe(finalize(() => this.loadingSubject.next(false)))
            .subscribe((res: any) => {
                this.metaSubscribers.forEach((subscriber: any) =>
                    subscriber.next(res)
                );
                this.entitySubject.next(res);
            });
    }
}
