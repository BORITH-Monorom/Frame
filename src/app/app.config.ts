import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngxs/store';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DataState } from './core/store/data-state.state';

export const appConfig: ApplicationConfig = {
  providers: [
      provideStore([DataState]),
      provideZoneChangeDetection({ eventCoalescing: true }),
      provideRouter(routes),
      provideAnimationsAsync(),
      provideAnimationsAsync()
    ]
};
