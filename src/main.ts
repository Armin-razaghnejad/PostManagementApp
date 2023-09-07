import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { PostsService } from './app/services/posts.service';
import { provideRouter } from '@angular/router';
import { APP_ROUTE } from './app/app-routing.module';
import { provideStore } from '@ngrx/store';
import { dataReducer, filterReducer, pageReducer } from './app/states/reducers';
import { provideEffects } from '@ngrx/effects';
import { PostEffects } from './app/states/effect';
import { provideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(APP_ROUTE),
    PostsService,
    provideEffects(PostEffects),
    provideStore({ posts: dataReducer, filter: filterReducer, page: pageReducer }),
    provideAnimations()
  ]
}).catch(e => console.error(e))

