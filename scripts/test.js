

class Scheduler {

    constructor(teams) {
        this.teams = teams;

        this.constraints = [];
    }

    createSchedule = (gameweeks) => {

        let schedule = new Schedule(this.teams, gameweeks);
        for (let i = 0; i < gameweeks; i++) {
            for (let j = 0; j < this.teams.length; j++) {
                let team = this.teams[j];
                for (let x = 0; x < this.teams.length; x++) {
                    if(!team.hasGame && this.teams[x] !=  team) {
                        schedule.schedule.push(new Game(team, team[x]));
                        team.hasGame = true;
                        this.teams[x].hasGame = true;
                        team.hasPlayed.push(this.teams[x]);
                        this.teams[x].hasPlayed.push(team.teamNumber);
                }
            }
        }
    }
}
