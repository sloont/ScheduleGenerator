// Class to represent the generator

class Generator {
    constructor(teams) {
        this.teams = teams;

        this.constraints = [];

        this.teamsToPlayMap = new Map();
        this.teams.forEach(team => {
            this.refreshTeamsToPlay(team);
        });
    }

    refreshTeamsToPlay = team => {
        let teamsToPlay = new Set();
        this.teams.forEach(team2 => {
            if (team.teamNumber !== team2.teamNumber) {
                teamsToPlay.add(team2.teamNumber);
            }
        });
        this.teamsToPlayMap.set(team.teamNumber, teamsToPlay);
    };

    createSchedule = (gameweeks) => {
        let schedule = new Schedule(this.teams, gameweeks);

        for (let gameweek = 0; gameweek < gameweeks; gameweek++) {
            this.teams.forEach(team1 => {
                if (!schedule.teamHasGameInGameweek(team1, gameweek)) {
                    for (let t2 = 0; t2 < this.teams.length; t2++) {
                        const team2 = this.teams[t2];

                        if (this.teamsToPlayMap.get(team1.teamNumber).has(team2.teamNumber)
                            && !schedule.teamHasGameInGameweek(team2, gameweek)) {

                            const game = { home: team1, away: team2 };
                            schedule.addGameToGameweek(game, gameweek);

                            this.teamsToPlayMap.get(team1.teamNumber).delete(team2.teamNumber);
                            if (this.teamsToPlayMap.get(team1.teamNumber).size === 0) {
                                this.refreshTeamsToPlay(team1);
                            }

                            this.teamsToPlayMap.get(team2.teamNumber).delete(team1.teamNumber);
                            if (this.teamsToPlayMap.get(team2.teamNumber).size === 0) {
                                this.refreshTeamsToPlay(team2);
                            }

                            break;
                        }
                    }
                }
            });
        };

        return schedule;
    }
}
