import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  @Output() event: EventEmitter<any> = new EventEmitter<any>();
  @Output() modal: EventEmitter<string> = new EventEmitter<string>();
}
