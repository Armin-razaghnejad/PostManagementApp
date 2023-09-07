import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { PostsService } from './app/services/posts.service';
import { provideRouter } from '@angular/router';
import { APP_ROUTE } from './app/app-routing.module';
import { provideStore } from '@ngrx/store';
import { addDataReducer, dataReducer, filterReducer, pageReducer } from './app/states/reducers';
import { provideEffects } from '@ngrx/effects';
import { PostEffects } from './app/states/effect';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(APP_ROUTE),
    PostsService,
    importProvidersFrom([MatSnackBarModule]),
    provideEffects(PostEffects),
    provideStore({ posts: dataReducer, filter: filterReducer, page: pageReducer, addPost:addDataReducer }),
    provideAnimations()
  ]
}).catch(e => console.error(e))

