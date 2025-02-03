import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngxs/store';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FrameState } from './core/store/frame-state.state';
import { PhotoState } from './core/store/photo-state.state';

export const appConfig: ApplicationConfig = {
  providers: [
      provideStore([FrameState, PhotoState]),
      provideZoneChangeDetection({ eventCoalescing: true }),
      provideRouter(routes),
      provideAnimationsAsync(),
      provideAnimationsAsync()
    ]
};
