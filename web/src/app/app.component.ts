import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { EventService } from './shared/services/event.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  @ViewChild('drawer')
  sidebar: MatDrawer;

  constructor(private eventService: EventService){
    this.eventService.event.subscribe(event => {      
      this.sidebar.toggle();
    });
  }
}
