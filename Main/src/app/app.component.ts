import {Component, OnInit} from '@angular/core';
import {EmitterService} from './shared/services/emitter.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  searchEmitter = EmitterService.get('search');
  title = 'app';
  name = '@ngx-share/buttons';
  constructor(private router: Router) {
  }

  ngOnInit() {
    this.searchEmitter.subscribe(
      msg => {
        this.router.navigate(['/search/' + msg]);
      }
    );
  }
}
