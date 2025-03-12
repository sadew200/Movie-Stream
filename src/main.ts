import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router'; // ✅ Import routing
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes'; // ✅ Import routes

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), // ✅ Ensures HttpClient works
    provideRouter(routes) // ✅ Set up routing
  ]
}).catch(err => console.error(err));
