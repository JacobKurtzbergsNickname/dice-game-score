import { Component, Input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { NameInputComponent } from '../name-input/name-input.component';
import { ActualScoreComponent } from '../actual-score/actual-score.component';
import { PlayerData } from '../player';

@Component({
  selector: 'pairodice-score-tile',
  standalone: true,
  imports: [MatCardModule, NameInputComponent, ActualScoreComponent],
  templateUrl: './score-tile.component.html',
  styleUrl: './score-tile.component.css',
})
export class ScoreTileComponent {
  @Input({ required: true }) player!: PlayerData;
  readonly nameChange = output<string>();
  readonly scoreEntry = output<number>();
}
