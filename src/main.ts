import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { registerLocaleData } from '@angular/common';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import localeEs from '@angular/common/locales/es';

if (environment.production) {
  enableProdMode();
}

registerLocaleData(localeEs);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
