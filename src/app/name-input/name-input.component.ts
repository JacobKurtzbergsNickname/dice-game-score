import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'pairodice-name-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './name-input.component.html',
  styleUrl: './name-input.component.css',
})
export class NameInputComponent {
  name = '';
  draftName = '';

  saveName(): void {
    this.name = this.draftName.trim();
  }

  removeName(): void {
    this.name = '';
    this.draftName = '';
  }
}
