//Class to represent the scheduler

class Scheduler {

    /**
    *  Constructor
    * @param {Array} teams An array of Team objects that participate in the schedule
    */
    constructor(teams) {
        this.teams = teams;

        this.constraints = [];
        this.teamsWithGames = [];
        this.teamsNeedGames = [];
        this.schedule = [];

        for (let x = 0; x < this.teams.length; x++) {
            this.teamsNeedGames.push(this.teams[x]);
        }
    }

    /**
     * 
     * @param {Number} gameweeks The number of the gameweek (or the index into the internal schedule array)
     */
    createSchedule = (gameweeks) => {
        
        const schedule = new Schedule(this.teams, gameweeks);

        for (let i = 0; i < gameweeks; i++) {
            
            while (this.teamsNeedGames.length > 0) {

                let team = this.teamsNeedGames[0];

                schedule.addGameToGameweek({H: team, A: this.teamsNeedGames[1]}, i);

                this.teamsWithGames.push(team);
                this.teamsWithGames.push(this.teamsNeedGames[1]);

                this.teamsNeedGames.splice(0,1);
                console.log(this.teams.length);
                console.log(this.teamsNeedGames.length);
                this.teamsNeedGames.splice(0,1);
               
            }
        }




        console.log(schedule);
    }
}


