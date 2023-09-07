import { Component } from '@angular/core';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadData } from './states/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    RouterOutlet
  ]
})
export class AppComponent {
  constructor(store: Store) {
    store.dispatch(loadData())
  }
}
