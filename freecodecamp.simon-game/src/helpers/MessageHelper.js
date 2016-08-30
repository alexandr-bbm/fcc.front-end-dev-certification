import sample from 'lodash/sample';

export default class MessageHelper {
    static SUCCESS_MESSAGES = [
        'Nice one.',
        'You rock!',
        '\\m/\\m/\\m/',
        'Yeah!',
        'Right!',
        'Awesome!',
        'Excellent!',
        'Amazing!',
        'Not bad!'
    ];

    static LISTEN_AGAIN = 'Sorry, your input is wrong! Listen again!';
    static GAME_OVER = 'GAME OVER!';
    static GAME_START = 'Here we go!';
    static WINNER_MESSAGE = 'Congratulations, you won!';

    static getRandomSuccess () {
        return sample(MessageHelper.SUCCESS_MESSAGES);
    }
}