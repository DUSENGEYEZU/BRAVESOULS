import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {
  fullText = 'Empowering organisations with intelligent digital solutions.';
  typedText = '';
  currentIndex = 0;

  ngOnInit() {
    this.typeNextCharacter();
  }

  typeNextCharacter() {
    if (this.currentIndex < this.fullText.length) {
      this.typedText += this.fullText[this.currentIndex];
      this.currentIndex++;
      const delay = Math.random() * (150 - 40) + 40; // random delay between 40–150ms
      setTimeout(() => this.typeNextCharacter(), delay);
    }
  }
}
