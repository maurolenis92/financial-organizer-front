import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
// import * as Sentry from "@sentry/angular";

// Sentry.init({
//   dsn: 'https://99e1d82f2b91bfa8c2686c4a558cc80f@o4510275163324416.ingest.us.sentry.io/4510275184033792',
//   sendDefaultPii: true,
// });
bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
