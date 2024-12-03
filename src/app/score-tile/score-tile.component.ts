import { Component } from '@angular/core';
import { NameInputComponent } from "../name-input/name-input.component";

@Component({
  selector: 'pairodice-score-tile',
  standalone: true,
  imports: [NameInputComponent],
  templateUrl: './score-tile.component.html',
  styleUrl: './score-tile.component.css',
  host: {"class":"col"}
})
export class ScoreTileComponent {

}
