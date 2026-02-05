import {
  ApplicationConfig,
  LOCALE_ID,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';

import { routes } from './app.routes';

registerLocaleData(localeEn);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
    { provide: LOCALE_ID, useValue: 'en' },
  ],
};
