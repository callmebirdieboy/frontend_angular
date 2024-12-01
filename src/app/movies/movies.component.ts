import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule], // Asegúrate de incluir HttpClientModule aquí
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movies: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  // Función para cargar la lista de películas
  loadMovies(): void {
    this.http.get<any[]>('${environment.apiUrl}').subscribe(data => {
      this.movies = data;
    });
  }

  // Función para eliminar una película
  deleteMovie(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta película?')) {
      this.http.delete(`${environment.apiUrl}/${id}`).subscribe(() => {
        alert('Película eliminada con éxito');
        this.loadMovies(); // Recargar la lista de películas después de eliminar
      });
    }
  }
}
