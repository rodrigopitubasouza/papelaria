import { EventService } from '../../services/event.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private eventService: EventService) { }

  ngOnInit() {
  }

  toggleMenu(){
    this.eventService.event.emit();
  }
}
