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

    setErrorColor() {
        this.color = 'red';
    }

    setDefaultColor() {
        this.color = 'yellow';
    }

    setSuccessColor() {
        this.color = 'green';
    }
}