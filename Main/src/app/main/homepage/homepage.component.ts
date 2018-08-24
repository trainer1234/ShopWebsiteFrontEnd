import { Component, OnInit } from '@angular/core';
import { EmitterService } from '../../shared/services/emitter.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private title: Title) {
    this.title.setTitle('Shop App Online');
  }

  ngOnInit() {
  }

}
