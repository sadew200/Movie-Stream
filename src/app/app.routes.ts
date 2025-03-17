import { Routes } from '@angular/router';
import { LoginPageComponent } from './page/login-page/login-page.component';
import { SignInPageComponent } from './page/sign-in-page/sign-in-page.component';
import { MovieListComponent } from './page/movie-list/movie-list.component';
import { PopularComponent } from './popular/popular.component';
import { TopRatedComponent } from './top-rated/top-rated.component';
import { NowComponent } from './now/now.component';
import { ListPageComponent } from './page/list-page/list-page.component';
import { MovieRecommendComponent } from './movie-recommend/movie-recommend.component';
import { GuideComponent } from './page/guide/guide.component';

export const routes: Routes = [  // ✅ Make sure this is exported
  { path: "", component: LoginPageComponent },
  { path: "signIn", component: SignInPageComponent },
  { path: "movieList", component: ListPageComponent },
  { path: "movieList/:data", component: MovieRecommendComponent },
  { path: "home", component: MovieListComponent },
  { path: "popularMovie", component: PopularComponent },
  { path: "topRatedMovie", component: TopRatedComponent },
  { path: "nowMovie", component: NowComponent },
  { path: "guide", component: GuideComponent },
];
