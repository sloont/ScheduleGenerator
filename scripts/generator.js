//Class to represent the generator v2

class Generator {
    constructor(teams, gameweeks) {
        this.teams = teams;
        this.gameweeks = gameweeks;

        this.constraints = [];

        this.gamePool = new Map();
        this.gamePoolArray = [];
        
        this.teams.forEach( team => {
            this.gamePool.set(team.teamNumber, new Map())
        });

        this.teamsToPlayAtHomeMap = new Map();

        this.teams.forEach(team => {
            this.refreshTeamsToPlay(team);
        });

        this.hasGameMap = new Map();
        this.teams.forEach( team => {
            this.hasGameMap.set(team.teamNumber, new Array(this.gameweeks).fill(false));
        });

        this.schedule = [];
        for (let i = 0; i < this.gameweeks; i++) {
            this.schedule.push([]);
        }
 //CONSTRUCTION OF THE INDEX OBJECT
        this.indexObject = {};

        for (let n = 0; n < (this.teams.length/2); n++) {
            this.indexObject["" + n] = 0;
        }

        
   ///////////////////////////////////////
 //CONSTRUCTION OF THE COMBINATIONS OBJECT
        this.combinationsObject = Object.assign({}, this.indexObject);
    
 //CONSTRUCTION OF THE COMBINATIONS MAP
        this.combinationsMap = new Map();
        
        this.uniqueGameweeksArray = [];

        }   

    refreshTeamsToPlay = team => {
        let teamsToPlayAtHome = new Set();
        this.teams.forEach(team2 => {
            if (team.teamNumber !== team2.teamNumber) {
                teamsToPlayAtHome.add(team2.teamNumber);
            }
        });
        this.teamsToPlayAtHomeMap.set(team.teamNumber, teamsToPlayAtHome);
    }


    createSchedule = (gameweeks) => {
        let schedule = new Schedule(this.teams, gameweeks);

        for(let gameweek = 0; gameweek < gameweeks; gameweek++) {
            this.teams.forEach(team1 => {
                if (!schedule.teamHasGameInGameweek(team1, gameweek)) {
                    for (let t2 = 0; t2 < this.teams.length; t2++) {
                        const team2 = this.teams[t2];

                        if (this.teamsToPlayAtHomeMap.get(team1.teamNumber).has(team2.teamNumber)
                            && !schedule.teamHasGameInGameweek(team2, gameweek)) {
                                const game = {home: team1, away: team2};
                                schedule.addGameToGameweek(game, gameweek);

                                this.teamsToPlayAtHomeMap.get(team1.teamNumber).delete(team2.teamNumber);
                                break;
                            }
                    }
                }
            });

            if (gameweek > 0 && (gameweek + 1) % ((this.teams.length -1) * 2) === 0) {
                this.teams.forEach(team => {
                    this.refreshTeamsToPlay(team);
                });
                console.log("did it work?");
            };
        };

        return schedule;
    }

    createGamePool = () => {

        this.teams.forEach(team1 => {
            for (let t2 = 0; t2 < this.teams.length; t2++) {
                const team2 = this.teams[t2];
    
                if (this.teamsToPlayAtHomeMap.get(team1.teamNumber).has(team2.teamNumber)) {
                    const game = {home: team1, away: team2};
                    
                    this.teamsToPlayAtHomeMap.get(team1.teamNumber).delete(team2.teamNumber);
                    this.gamePool.get(team1.teamNumber).set(team2.teamNumber, game);
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
            if (array[i].home.teamNumber != gameChoice.home.teamNumber &&
                array[i].away.teamNumber != gameChoice.home.teamNumber &&
                array[i].home.teamNumber != gameChoice.away.teamNumber &&
                array[i].away.teamNumber != gameChoice.away.teamNumber) {
                
                
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
                if (gameweek[""+i].home.teamNumber === comparison[""+x].home.teamNumber &&
                    gameweek[""+i].away.teamNumber === comparison[""+x].away.teamNumber) {
                    
                    count++;
                    
                }
        
            }
        }

        if (count === n/2) {
            validator = false;
        }

        /*if (validator == false) {
            console.log(validator);
            console.log(count);
            //console.log(gameweek);
            console.log(comparison);
        }*/

        return validator;
    }

}
