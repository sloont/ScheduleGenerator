//Schedule class

class Schedule {

    constructor(teams, gameweeks) {
        this.teams = teams;

        this.schedule = [];
        this.gameweeks = gameweeks;

        for (let i=0; i < this.gameweeks; i++) {
            this.schedule.push([])                  //this doesn't push anything at the moment
        
        }
    }

    addGameToGameweek(game, gameweek) {
        if ((gameweek < 0) || (gameweek > this.gameweeks)) {
            throw `Invalid gameweek number. Provided number '${gameweek}', schedule size is '${this.schedule.length}.`;
        }

        this.schedule[gameweek].push(game);
    }
}