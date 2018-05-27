/**
 * enumerated state colors 
 * 
 * @author Kellerman
 *  
 */
export enum CardColors {
    match = '#58C565',
    unmatch = '#C54023',
    default = '#EEB422'    
};

/**
 * It's a card model and represent
 * every card on the view
 * 
 * @author Kellerman
 * 
 */
export class Card {
    frontValue: string;
    verseValue: string;
    showFrontValue: Boolean;
    disabled: Boolean;
    color: string;

    constructor(frontValue: string) {
        this.verseValue = "glyphicon glyphicon-question-sign";
        this.frontValue = frontValue;
        this.showFrontValue = false;
        this.disabled = false;
        this.color = CardColors.default;
    }

    /**
     * 
     * static method that return the icons of every card
     * 
     */
    static templateValues(): string[] {
        return [
            "glyphicon glyphicon-heart",
            "glyphicon glyphicon-plane",
            "glyphicon glyphicon-leaf",
            "glyphicon glyphicon-music",
            "glyphicon glyphicon-ice-lolly-tasted",
            "glyphicon glyphicon-star"
        ];
    }
}