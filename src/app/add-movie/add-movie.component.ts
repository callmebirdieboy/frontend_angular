import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importar FormsModule para usar ngModel
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-add-movie',
  standalone: true, // Declarar como standalone
  imports: [CommonModule, FormsModule], // Importar módulos necesarios
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent {
  movie: any = {
    title: '',
    synopsis: '',
    year: null
  };

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(): void {
    if (this.movie.title && this.movie.synopsis && this.movie.year) {
      this.http.post('${environment.apiUrl}', this.movie).subscribe(
        (response) => {
          console.log('Response:', response);
          alert('Película agregada con éxito');
          this.router.navigate(['/movies']);
        },
        (error) => {
          console.error('Error:', error);
          alert('Hubo un error al agregar la película');
          // Añadir más información del error para diagnosticar
          if (error.error && error.error.message) {
            console.error('Error Message:', error.error.message);
          } else if (error.message) {
            console.error('Error Message:', error.message);
          }
        }
      );
    } else {
      alert('Por favor llena todos los campos');
    }
  }
  
}
