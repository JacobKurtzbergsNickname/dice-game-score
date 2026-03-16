import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'pairodice-name-input',
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './name-input.component.html',
  styleUrl: './name-input.component.css',
})
export class NameInputComponent {
  name = '';
  draftName = '';

  saveName(): void {
    this.name = this.draftName.trim();
    this.draftName = this.name;
  }

  removeName(): void {
    this.name = '';
    this.draftName = '';
  }
}
