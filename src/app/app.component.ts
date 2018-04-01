import { Card } from './card.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  verseCardValue = "::";
  cardValues = ["A", "B", "C", "D", "E", "F", "A", "B", "C", "D", "E", "F"];
  cards: Card[] = [];
  cardsSelected: Card[] = [];
  points: number;
  message: string;
  error: Boolean;

  ngOnInit(): void {
    this.resetGame();
  }

  turn(card: Card) {
    if (card.disabled) return;
    this.validateSelectedCardsOnError();
    card.showValue = !card.showValue;
    if (card.showValue) {
      this.cardsSelected.push(card);
    } else {
      this.cardsSelected = this.cardsSelected.filter(c => c != card);
    }
    this.validateSelectedCards();
    this.validateEndOfGame();
  }

  validateSelectedCards() {
    if (this.cardsSelected.length == 2) {
      if (this.cardsSelected[0].value == this.cardsSelected[1].value) {
        this.message = "Match :D";
        this.cardsSelected.forEach(card => {
          card.disabled = true;
          card.setMatchColor();
        })
        this.cardsSelected = [];
        this.points++;
      } else {
        this.message = "Not Match :(";
        this.points--;
        this.error = true;
        this.cardsSelected.forEach(c => c.setNotMatchColor());
      }
    }
  }

  validateSelectedCardsOnError() {
    if (this.error) {
      this.cardsSelected.forEach(card => {
        card.showValue = false;
        card.setDefaultColor();
      })
      this.cardsSelected = [];
      this.error = false;
    }
  }

  validateEndOfGame() {
    if (this.cards.filter(card => !card.showValue).length == 0) {
      this.message = "End of the game!";
    }
  }

  resetGame() {
    this.cardValues = this.shuffle(this.cardValues);
    this.cards = [];
    this.cardValues.forEach(val => this.cards.push(new Card(val)))
    this.points = 0;
    this.message = "Choose a card";
    this.error = false;
  }

  // copy/paste from stackoverflow...rsrsrs
  shuffle(array) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      let temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

}
