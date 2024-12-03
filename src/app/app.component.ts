import { Component } from '@angular/core';
import { ScoreBoardComponent } from "./score-board/score-board.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScoreBoardComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'dice-game-score';
}
