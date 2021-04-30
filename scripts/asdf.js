createSchedule = (gameweeks) => {
    this.schedule = new Schedule(this.teams, gameweeks);

    for (let i = 0; i < gameweeks; i++) {

        while (this.teamsNeedGames.length > 0) {
            let counter = 1;
            let home = this.teamsNeedGames[0];
            let away = this.teamsNeedGames[counter]
            let playedBool = false;

            for (let j = 0; j < this.playedCombinations.length; j++) {
                if (this.playedCombinations[j][0] == home.teamNumber && this.playedCombinations[j][1] == away.teamNumber) {
                    playedBool = true;
                }
            }

            if(!playedBool) {

                this.schedule.addGameToGameweek({H: home, A: away}, i);

                this.teamsWithGames.push(home);
                this.teamsWithGames.push(away);

                this.teamsNeedGames.splice(0,1);
                console.log(this.teams.length);
                console.log(this.teamsNeedGames.length);
                this.teamsNeedGames.splice(counter - 1 ,1);

                this.playedCombinations.push([home.teamNumber, away.teamNumber]);

            } else {
                counter++;
            }

            playedBool = false;
        }

        this.teamsWithGames = [];
        this.gameweekTransition();
    }

    console.log(this.schedule);
}
