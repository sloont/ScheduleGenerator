//makeSchedule class

class makeSchedule {

    constructor(teams) {
        this.teams = teams;

        this.constraints = [];
    }

    addConstraint = (constraintFunction) => {
        this.constraints.push(constraintFunction);
    }

    createSchedule = (gameweeks) => {
        let schedule = new Schedule(this.teams, gameweeks);

        for (let gameweek = 0; gameweek < gameweeks; gameweek++) {
            const team1Number = Math.floor(Math.random() * this.teams.length);
            const team2Number = Math.floor(Math.random() * this.teams.length);

            const game = { H: this.teams[team1Number], A: this.teams[team2Number] };

            schedule.addGameToGameweek(game, gameweek);
        }

        console.log(schedule.schedule);
    }
}

