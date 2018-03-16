/**
 * Created by lawrenceackner on 3/2/18.
 */

class Constants {
    Y_YOUR_CARDS = 5;
    CARD_HEIGHT = .5;

    GAP_4ROWS = .3;
    INNER_GAP_4ROWS = .1;
    FIRST_ROW = this.Y_YOUR_CARDS - this.CARD_HEIGHT - this.GAP_4ROWS;
    SECOND_ROW = this.FIRST_ROW - this.CARD_HEIGHT - this.INNER_GAP_4ROWS;
    THIRD_ROW = this.SECOND_ROW - this.CARD_HEIGHT - this.INNER_GAP_4ROWS;
    FORTH_ROW = this.THIRD_ROW - this.CARD_HEIGHT - this.INNER_GAP_4ROWS;
    ROUND_ROW = this.FORTH_ROW - this.CARD_HEIGHT - this.GAP_4ROWS;
    NAMES_ROW = this.ROUND_ROW - this.CARD_HEIGHT - this.INNER_GAP_4ROWS;
    START_X = 1.2;


}
module.exports = {Constants};