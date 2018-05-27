import { Card, CardColors } from './card.model';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  cards: Card[] = [];
  turnedCards: Card[] = [];
  points: number;
  message: string;
  twoCardsUnmatch: Boolean;

  constructor(public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit(): void {
    this.resetGame();
  }

  /**
   * 
   * this method is called when the user touch the card. 
   * 
   * */
  turn(card: Card) {
    // if the user click on one card that's already turned and validated, then do nothing
    if (card.disabled) return;
    // if two cards already turned and unmatch
    this.validateTwoCardsUnmatch();
    // if show front value, add to turnedCards, else remove from turnedCards
    card.showFrontValue = !card.showFrontValue;
    if (card.showFrontValue) {
      this.turnedCards.push(card);
    } else {
      this.turnedCards = this.turnedCards.filter(c => c != card);
    }    
    this.validateTurnedCards();    
    this.validateEndOfGame();
  }

  /**
   * 
   * if two cards already turned, then validate the values
   * 
   */
  private validateTurnedCards() {
    if (this.turnedCards.length == 2) {
      if (this.turnedCards[0].frontValue == this.turnedCards[1].frontValue) {
        this.message = "Match";
        // important: the arrays 'cards' and 'turnedCards' holds the same references. 
        // Then, the changes on 'turnedCards' will reflect on 'cards' too, 
        // even if the 'turnedCards' is cleaned after
        this.turnedCards.forEach(card => {
          card.disabled = true;
          card.color = CardColors.match;
        })
        // clean the array
        this.turnedCards = [];
        this.points++;
        this.showSuccess("Match");
      } else {
        this.message = "Unmatch";
        this.points--;
        this.showError("Unmatch");
        this.twoCardsUnmatch = true;
        this.turnedCards.forEach(c => c.color = CardColors.unmatch);
      }
    }
  }

  /**
   * 
   * reset state if two cards turned has unmatch values
   * 
   */
  private validateTwoCardsUnmatch() {
    if (this.twoCardsUnmatch) {
      // important: the arrays cards and turnedCards holds the same references. 
      // Then, the changes on turnedCards will reflect on cards too, 
      // even if the turnedCards is cleaned after
      this.turnedCards.forEach(card => {
        card.showFrontValue = false;
        card.color = CardColors.default;
      })
      // clean the array
      this.turnedCards = [];
      this.twoCardsUnmatch = false;
    }
  }
  /**
   * 
   * if all cards are turned, then is the end of game 
   * 
   */
  private validateEndOfGame() {
    if (this.cards.filter(card => !card.showFrontValue).length == 0) {
      this.message = "End of the game!";
      if(confirm(`End of the game.\nYou make ${this.points} point(s).\nDo you want try again?`)){
        this.resetGame();
      }
    }
  }

  /**
   * 
   * this method init and reset the game.
   * 
   */
  resetGame() {
    this.cards = [];
    this.turnedCards = [];
    // duplicate all front values for match/unmath test works later
    let duplicateFrontValues = Card.templateValues().concat(Card.templateValues());
    // shuffle the values and create one card with every value
    this.shuffle(duplicateFrontValues).forEach(val => this.cards.push(new Card(val)))
    this.points = 0;
    this.message = "Choose a card";
    this.twoCardsUnmatch = false;
  }

  private showSuccess(msg: string) {
    this.toastr.success(msg, 'Success!');
  }

  private showError(msg: string) {
    this.toastr.error(msg, 'Oops!');
  }

  /**
   * 
   * shuffle the values before set to the cards
   * 
   * @param array 
   * 
   */
  private shuffle(array) {
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
