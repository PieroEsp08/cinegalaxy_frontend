import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sala',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sala.component.html',
  styleUrl: './sala.component.css'
})
export class SalaComponent {

getRowLabel(i: number): string {
  return String.fromCharCode(65 + i);
}

getSeatLabel(rowIndex: number, seatIndex: number): string {
  const rowLetter = this.getRowLabel(rowIndex);
  const seatNumber = seatIndex + 1; // empieza en 1
  return `${rowLetter}${seatNumber}`;
}

}
