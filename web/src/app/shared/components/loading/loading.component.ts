import { Component, OnInit, Injectable, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `<div class='loading' *ngIf='loading'>
              <mat-spinner strokeWidth=10 diameter=100></mat-spinner>
            </div>`,
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  loading: boolean;

  constructor(private loadingService: LoadingService) {
    this.loading = false;
  }

  ngOnInit() {
    this.loadingService.loadingEvent.subscribe(data => {
      if (data) {
        this.loading = true;
      } else {
        this.loading = false;
      }
    })
  }
}

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  @Output() loadingEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  public showLoading() {
    this.loadingEvent.emit(true);
  }

  public hideLoading() {
    this.loadingEvent.emit(false);
  }
}
