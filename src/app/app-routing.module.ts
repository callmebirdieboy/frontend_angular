import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { MovieComponent } from './movie/movie.component';

const routes: Routes = [
  { path: '', redirectTo: '/movies', pathMatch: 'full' }, // Redirigir a la lista de películas
  { path: 'movies', component: MoviesComponent }, // Ruta para la lista de películas
  { path: 'movie/:id', component: MovieComponent } // Ruta para los detalles de una película
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
