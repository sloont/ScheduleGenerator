//Class to represent the generator v2

class Generator {

    constructor(teams) {

        this.teams = teams;
        ////    
        let temp = [];

        for (let i = 0; i < this.teams.length; i++) {

            temp.push(this.teams[i].teamNumber);
        }
        this.teams = temp;
        ////

        this.gamePool = new Map();
        this.gamePoolArray = [];
        
        this.teams.forEach( team => {

            this.gamePool.set(team, new Map())
        });

        this.teamsToPlayAtHomeMap = new Map();

        this.teams.forEach(team => {

            this.refreshTeamsToPlay(team);
        });

        
 //CONSTRUCTION OF THE INDEX OBJECT
        this.indexObject = {};

        for (let n = 0; n < (this.teams.length/2); n++) {
            this.indexObject["" + n] = 0;
        }

        this.uniqueGameweeksArray = [];

        this.indexArray = [];
    }
    
    refreshTeamsToPlay = team => {

        let teamsToPlayAtHome = new Set();
        this.teams.forEach(team2 => {

            if (team !== team2) {

                teamsToPlayAtHome.add(team2);
            }
        });

        this.teamsToPlayAtHomeMap.set(team, teamsToPlayAtHome);
    }

    createGamePool = () => {

        this.teams.forEach(team1 => {

            for (let t2 = 0; t2 < this.teams.length; t2++) {

                const team2 = this.teams[t2];
    
                if (this.teamsToPlayAtHomeMap.get(team1).has(team2)) {

                    const game = {home: team1, away: team2};
                    
                    this.teamsToPlayAtHomeMap.get(team1).delete(team2);
                    this.gamePool.get(team1).set(team2, game);
                    this.gamePoolArray.push(game);
                }
            }
        });
    }

    printGamePool = () => {

        this.gamePool.forEach(game => {
            console.log(game);
        })
    }

    generateGameweek = (array, indexObject, chosenGames = []) => {
        //default
        if (chosenGames.length === (this.teams.length/2)) {
            return chosenGames;
        }

        let iteratorChoice = chosenGames.length;
        let indexChoice = indexObject["" + iteratorChoice];


        

        let gameArray = [];
        let gameSelection = chosenGames;

        let gameChoice = array[indexChoice];
        gameSelection.push(gameChoice);

        for (let i = 0; i < array.length; i++) {

            if (array[i].home != gameChoice.home &&
                array[i].away != gameChoice.home &&
                array[i].home != gameChoice.away &&
                array[i].away != gameChoice.away) {
                
                
                    gameArray.push(array[i]);
                }
        }
        return this.generateGameweek(gameArray, indexObject, gameSelection);        
    }

    resetIndex = (i) => {

        this.indexObject["" + i] = 0;
    }
    
//This method checks whether **ALL** fixtures are identical when comparing two gameweek objects
//Returns False if these are identical gameweeks.
    compareGameweeks = (gameweek, comparison) => {  ////Here is where we could probably async something. Check all 4 games at once

        let validator = true;
        let count = 0;
        const n = this.teams.length;
        
        for (let i = 0; i < (n/2); i++) {

            for (let x = 0; x < (n/2); x++) {

                if (gameweek[""+i].home === comparison[""+x].home &&
                    gameweek[""+i].away === comparison[""+x].away) {
                    
                    count++;
                    
                }
            }
        }

        if (count === n/2) {

            validator = false;
        }

        return validator;
    }

    generateUniqueGameweeks = (array = [], i = 0) => {

        //DEFAULT
        const n = this.teams.length;
        let combinations = array;

        if (i === (n/2)) {

            let gameweek = this.generateGameweek(this.gamePoolArray, this.indexObject);
            let validator = true;

            if (this.uniqueGameweeksArray.length > 0) {
                for (let x = 0; x < this.uniqueGameweeksArray.length; x++) {
                    if (!this.compareGameweeks(this.uniqueGameweeksArray[x], gameweek)) {
                        validator = false;
                        break;
                    }
                }
                if (validator) {
                    this.uniqueGameweeksArray.push(gameweek);
                }
            } else {
                this.uniqueGameweeksArray.push(gameweek);
            }

            return this.indexArray;
            
        }

        for(let x = 0; x < ((n-2*i)*((n-1)-2*i)); x ++ ) {
            
            this.indexObject["" + i] = x;
            this.generateUniqueGameweeks(combinations, i + 1 );
            
        }
    }

}

