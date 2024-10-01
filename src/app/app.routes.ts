import { Routes } from '@angular/router';
import { LoginPageComponent } from './page/login-page/login-page.component';
import { SignInPageComponent } from './page/sign-in-page/sign-in-page.component';
import { MovieListComponent } from './page/movie-list/movie-list.component';

export const routes: Routes = [{
    path: "",
    component:LoginPageComponent
},
{
    path: "signIn",
    component:SignInPageComponent
},
{
    path: "movieList",
    component:MovieListComponent
}
];
