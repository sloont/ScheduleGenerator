// class used for making a game

class Game {

    constructor(home, away) {
        this.home = home;
        this.away = away;

    }

    swapSides = () => {
        let temp = this.home;
        this.home = this.away;
        this.away = temp;
    }
}
const team1 = {"teamName": "benders"};
const team2 = {"teamName": "frylocks"};
const game1 = new Game(team1, team2);
console.log(game1);