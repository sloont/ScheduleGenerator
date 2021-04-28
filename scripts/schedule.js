// A simple class to represent a schedule
class Schedule {
    // schedule data structure
    // [ [{H: Team1, A: TeamN }, {H: TeamN-1, A: Team2 }, ...numTeams/2 ], ...numOfGames]
  
    /**
     * Constructor
     * @param {Array} teams An array of Team objects that participate in the schedule
     * @param {Number} gameweeks The number of gameweeks in the schedule
     */
    constructor(teams, gameweeks) {
      this.teams = teams;
  
      this.schedule = [];
      this.gameweeks = gameweeks;
  
      for (let i = 0; i < this.gameweeks; i++) {
        this.schedule.push([]);
      }
  
    }
  
    /**
     * A method that adds a Game to the provided gameweek
     * @param {Game} game An object that represents a "Game", must contain "H" and "A" properties for home and away
     * @param {Number} gameweek The number of the gameweek (or the index into the internal schedule array)
     */
    addGameToGameweek(game, gameweek) {
      if ((gameweek < 0) || (gameweek > this.gameweeks)) {
        throw `Invalid gameweek Number. Provided number '${gameweek}', schedule size is '${this.schedule.length}'`;
      }
  
      this.schedule[gameweek].push(game);
    }
  
  }