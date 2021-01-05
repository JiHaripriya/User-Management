import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from './shared/services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  title = 'User-Manager';

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.autoLogin();
  }
}
