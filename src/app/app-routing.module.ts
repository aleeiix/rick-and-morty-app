import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseLayoutComponent } from './core/layouts/base-layout/base-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./modules/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'characters',
        loadChildren: () =>
          import('./modules/characters/characters.module').then(
            (m) => m.CharactersModule
          ),
      },
      {
        path: 'locations',
        loadChildren: () =>
          import('./modules/locations/locations.module').then(
            (m) => m.LocationsModule
          ),
      },
      {
        path: 'episodes',
        loadChildren: () =>
          import('./modules/episodes/episodes.module').then(
            (m) => m.EpisodesModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
