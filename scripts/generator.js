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

    /*generatePossibleNextGames = (mostRecentGame, map, chosenGames) => {
        const homeNumber = mostRecentGame.home.teamNumber;
        const awayNumber = mostRecentGame.away.teamNumber;

        let gameMap = new Map();
        
        
        this.teams.forEach( team => {
            gameMap.set(team.teamNumber, new Map())
        });

        map.forEach( homeTeam => {
            if (homeTeam.has(homeNumber) && homeTeam.has(awayNumber)) {

                homeTeam.forEach( game => {
                    if (game.away.teamNumber != homeNumber && game.away.teamNumber != awayNumber) {
                        console.log(game.home.teamNumber + " " + game.away.teamNumber);
                        
                        gameMap.get(game.home.teamNumber).set(game.away.teamNumber, game);
                    }
                    
                });
            }
        });

        return gameMap;
    }*/

    generateGameweek = (map, chosenGames = []) => {
        //default
        if (chosenGames.length === (this.teams.length/2)) {
            return chosenGames;
        }

        let gameMap = [];
        let gameSelection = chosenGames;

        let gameChoice = map[0];
        gameSelection.push(gameChoice);

        for (let i = 0; i < map.length; i++) {
            if (map[i].home.teamNumber != gameChoice.home.teamNumber &&
                map[i].away.teamNumber != gameChoice.home.teamNumber &&
                map[i].home.teamNumber != gameChoice.away.teamNumber &&
                map[i].away.teamNumber != gameChoice.away.teamNumber) {
                
                console.log(map[i].home.teamNumber + " " + map[i].away.teamNumber);
                gameMap.push(map[i]);
                }
        }
        return this.generateGameweek(gameMap, gameSelection);        
    }

}

