import { Component, ElementRef, computed, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { ScoreTileComponent } from '../score-tile/score-tile.component';
import { PlayerData } from '../player';
import { calculateScore } from '../actual-score/calculate-score';

@Component({
  selector: 'pairodice-score-board',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatCardModule, ScoreTileComponent],
  templateUrl: './score-board.component.html',
  styleUrl: './score-board.component.css',
})
export class ScoreBoardComponent {
  readonly players = signal<PlayerData[]>([{ id: 1, name: '', scoreEntries: [] }]);
  readonly activeSlide = signal(0);
  readonly totalSlides = computed(() => this.players().length + 1);

  private readonly carouselRef = viewChild<ElementRef<HTMLElement>>('carousel');

  addPlayer(): void {
    this.players.update((ps) => {
      const nextId = ps.length + 1;
      return [...ps, { id: nextId, name: '', scoreEntries: [] }];
    });
    // Navigate to the new player card on mobile
    const newIndex = this.players().length - 1;
    setTimeout(() => this.scrollToSlide(newIndex), 0);
  }

  updatePlayerName(id: number, name: string): void {
    this.players.update((ps) => ps.map((p) => (p.id === id ? { ...p, name } : p)));
  }

  addScoreEntry(id: number, entry: number): void {
    this.players.update((ps) =>
      ps.map((p) => (p.id === id ? { ...p, scoreEntries: [...p.scoreEntries, entry] } : p)),
    );
  }

  playerScore(player: PlayerData): number {
    return calculateScore(player.scoreEntries);
  }

  onCarouselScroll(event: Event): void {
    const el = event.target as HTMLElement;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    this.activeSlide.set(index);
  }

  scrollToSlide(index: number): void {
    const el = this.carouselRef()?.nativeElement;
    if (el) {
      el.scrollTo({ left: index * el.clientWidth, behavior: 'smooth' });
    }
    this.activeSlide.set(index);
  }
}
