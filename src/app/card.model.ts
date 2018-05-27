export class Card {
    value: string;
    showValue: Boolean;
    disabled: Boolean;
    color: string;

    constructor(value: string) {
        this.value = value;
        this.showValue = false;
        this.disabled = false;
        this.setDefaultColor();
    }

    setNotMatchColor() {
        this.color = '#C54023';
    }

    setDefaultColor() {
        this.color = '#EEB422';
    }

    setMatchColor() {
        this.color = '#58C565';
    }
}