import { Component, Input, output } from '@angular/core';
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
  @Input() savedName = '';
  draftName = '';
  readonly nameChange = output<string>();

  saveName(): void {
    const trimmed = this.draftName.trim();
    this.nameChange.emit(trimmed);
    this.draftName = trimmed;
  }

  removeName(): void {
    this.nameChange.emit('');
    this.draftName = '';
  }
}
