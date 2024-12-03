import { Component } from '@angular/core';

@Component({
  selector: 'pairodice-name-input',
  standalone: true,
  imports: [],
  templateUrl: './name-input.component.html',
  styleUrl: './name-input.component.css'
})
export class NameInputComponent {

  name = "";

  changeName(event: any) {
    this.name = event.target.value;
  }

  removeName() {
    this.name = "";
  }

}
