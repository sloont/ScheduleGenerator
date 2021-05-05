//Class to represent the generator v2

class Generator {

    constructor(teams, gameweeks) {

        this.teams = teams;
        ////    
        let temp = [];

        for (let i = 0; i < this.teams.length; i++) {

            temp.push(this.teams[i].teamNumber);
        }
        this.teams = temp;
        ////
        this.gameweeks = gameweeks;

        this.constraints = [];

        this.gamePool = new Map();
        this.gamePoolArray = [];
        
        this.teams.forEach( team => {

            this.gamePool.set(team, new Map())
        });

        this.teamsToPlayAtHomeMap = new Map();

        this.teams.forEach(team => {

            this.refreshTeamsToPlay(team);
        });

        this.hasGameMap = new Map();
        
        this.teams.forEach( team => {

            this.hasGameMap.set(team, new Array(this.gameweeks).fill(false));
        });

        
 //CONSTRUCTION OF THE INDEX OBJECT
        this.indexObject = {};

        for (let n = 0; n < (this.teams.length/2); n++) {
            this.indexObject["" + n] = 0;
        }

 //CONSTRUCTION OF THE COMBINATIONS OBJECT
        this.combinationsObject = Object.assign({}, this.indexObject);
    
 //CONSTRUCTION OF THE COMBINATIONS MAP
        this.combinationsMap = new Map();
        
        this.uniqueGameweeksArray = [];

        }   

    refreshTeamsToPlay = (team) => {
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

    displayGamePool = () => {       //probably update

        this.gamePool.forEach(teamNumber => {

            teamNumber.forEach(game => {

                postTeam(game["home"]);
                countChildren();
                postTeam(game["away"]);
                countChildren();
            })
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

    pumpIndex = (i) => {

        const n = this.teams.length;

        for (let x = 0; x < ((n-2*i)*((n-1)-2*i)); x ++) {

            this.indexObject["" + i] = x;
            console.log(this.indexObject);
        }
        this.resetIndex(i);
    }

    indexCombinations = (i = 0, array = []) => {

        const n = this.teams.length;
        let combinations = array;

        //DEFAULT
        if (i > (n/2 -1)) {

            return combinations;
        }
        
        for (let x = 0; x < ((n-2*i)*((n-1)-2*i)); x ++ ) {

            this.indexObject["" + i] = x;
            let temp = Object.assign({}, this.indexObject);
            
            combinations.push(temp);
            
            
        }

        this.combinationsObject["" + i] = combinations;
        this.resetIndex(i);
        
        
        return this.indexCombinations(i + 1);
    }

    generateCombinationsMap = (map, i = 0) => {
        //DEFAULT
        const n = this.teams.length;
        

        if (i === (n/2)) {

            let tempObject = Object.assign({}, this.indexObject);
            this.placeCombinationsInMap(tempObject);
            return this.combinationsMap;
            
        }

        for(let x = 0; x < ((n-2*i)*((n-1)-2*i)); x ++ ) {
            
            map.set(x, new Map());
            this.indexObject["" + i] = x;
            this.generateCombinationsMap(map.get(x), i + 1 );
            
        }

        return this.combinationsMap;
    }

    placeCombinationsInMap = (indexObject) => {

        const n = this.teams.length;
        let tempMap = this.combinationsMap;

        for (let i = 0; i < n/2 - 1; i++) {

            let currentIndex = indexObject["" + i];
            
            tempMap = tempMap.get(currentIndex);
        }

        tempMap.set(indexObject["" + (n/2 - 1)], this.generateGameweek(this.gamePoolArray, indexObject));
    }

    makeGameweekArrayFromCombinationsMap = (map, i = 0) => {

        const n = this.teams.length;
        let validator = true;

        if (i === (n/2)) {

            if (this.uniqueGameweeksArray.length > 0) {

                for (let q = 0; q < this.uniqueGameweeksArray.length; q++) {

                    if (!this.compareGameweeks(this.uniqueGameweeksArray[q], map)) {

                        validator = false;
                        break;
                    }

                    
                }

                if (validator) {
            
                    this.uniqueGameweeksArray.push(map);
                }

                

            } else {

                this.uniqueGameweeksArray.push(map);
            }
            
        }

        for (let f = 0; f < ((n-2*i)*((n-1)-2*i)); f ++ ) {
            
            this.makeGameweekArrayFromCombinationsMap(map.get(f), i + 1);
        }
    }
//This method checks whether **ALL** fixtures are identical when comparing two gameweek objects
//Returns False if these are identical gameweeks.
    compareGameweeks = (gameweek, comparison) => {

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

}

