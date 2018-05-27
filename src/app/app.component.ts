import { Card } from './card.model';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  verseIcon = "glyphicon glyphicon-question-sign";
  cardValuesTemplate = [
    "glyphicon glyphicon-heart", 
    "glyphicon glyphicon-plane", 
    "glyphicon glyphicon-leaf",
    "glyphicon glyphicon-music", 
    "glyphicon glyphicon-cloud", 
    "glyphicon glyphicon-star"];
  cards: Card[] = [];
  cardsSelected: Card[] = [];
  points: number;
  message: string;
  error: Boolean;

  constructor(public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

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
        this.message = "Match";
        this.cardsSelected.forEach(card => {
          card.disabled = true;
          card.setMatchColor();
        })
        this.cardsSelected = [];
        this.points++;
        this.showSuccess("Match");
      } else {
        this.message = "Not Match";
        this.points--;
        this.showError("Not Match");
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
    this.cards = [];
    this.cardsSelected = [];
    let cardValues = this.cardValuesTemplate.concat(this.cardValuesTemplate);
    cardValues = this.shuffle(cardValues);
    cardValues.forEach(val => this.cards.push(new Card(val)))
    this.points = 0;
    this.message = "Choose a card";
    this.error = false;
  }

  showSuccess(msg: string) {
    this.toastr.success(msg, 'Success!');
  }

  showError(msg: string) {
    this.toastr.error(msg, 'Oops!');
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
