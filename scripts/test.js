class Scheduler {

    constructor(teams) {
        this.teams = teams;

        this.constraints = [];
        this.teamsWithGames = [];
        this.teamsNeedGames = teams;
        this.schedule = [];
    }

    createSchedule = (gameweeks) => {

        const schedule = new Schedule(this.teams, gameweeks);

        for (let i = 0; i < gameweeks; i++) {
            console.log("outer");
            let counter = 0;
            while (this.teamsNeedGames.length > 0) {

                let team = this.teamsNeedGames[0];

                schedule.addGameToGameweek({H: team, A: this.teamsNeedGames[1]}, i);

                this.teamsWithGames.push(team);
                this.teamsWithGames.push(this.teamsNeedGames[1]);

                this.teamsNeedGames.splice(0,1);
                this.teamsNeedGames.splice(0,1);
               
            }
        }




        console.log(schedule);
    }
}

const makeScheduler = (teams, gameweeks) => {
    const scheduler = new Scheduler (teams);
    scheduler.createSchedule(gameweeks);
    return scheduler;
}

