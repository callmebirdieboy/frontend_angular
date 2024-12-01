import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router'; // Añadir Router
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [CommonModule, RouterModule], // Añadir RouterModule aquí
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  movie: any = {};
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {} // Añadir router

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.get(`${environment.apiUrl}/${id}`).subscribe(
      (data: any) => {
        this.movie = data;
      },
      (error) => {
        this.errorMessage = 'Error al cargar los detalles de la película. Por favor, inténtalo más tarde.';
      }
    );
  }

  deleteMovie(): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta película?')) {
      const id = this.route.snapshot.paramMap.get('id');
      this.http.delete(`${environment.apiUrl}/${id}`).subscribe(
        () => {
          alert('Película eliminada con éxito');
          // Redirigir al catálogo de películas después de eliminar la película
          this.router.navigate(['/movies']);
        },
        (error) => {
          this.errorMessage = 'Error al eliminar la película. Por favor, inténtalo más tarde.';
        }
      );
    }
  }
}
