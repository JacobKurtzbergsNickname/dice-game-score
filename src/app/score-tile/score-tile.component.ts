import { Component } from '@angular/core';
import { NameInputComponent } from "../name-input/name-input.component";
import { ActualScoreComponent } from "../actual-score/actual-score.component";

@Component({
  selector: 'pairodice-score-tile',
  standalone: true,
  imports: [NameInputComponent, ActualScoreComponent],
  templateUrl: './score-tile.component.html',
  styleUrl: './score-tile.component.css',
  host: {"class":"col"}
})
export class ScoreTileComponent {

}
