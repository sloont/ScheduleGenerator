// A simple class to represent a schedule
class Schedule {
  // schedule data structure
  // [ [{H: Team1, A: TeamN }, {H: TeamN-1, A: Team2 }, ...numTeams/2 ], ...numOfGames]

  constructor(teams, gameweeks) {
    this.teams = teams;
    this.gameweeks = gameweeks;

    this.schedule = [];
    // initialize an "empty" schedule array (array of empty arrays for each gameweek)
    for (let i = 0; i < this.gameweeks; i++) {
      this.schedule.push([]);
    }

    this.hasGameMap = new Map();
    // initialize the hasGameMap by adding an array of "false" values for each gameweek for each team
    this.teams.forEach(team => {
      this.hasGameMap.set(team.teamNumber, new Array(this.gameweeks).fill(false));
    });
  }

  addGameToGameweek = (game, gameweek) => {
    if ((gameweek < 0) || (gameweek > this.gameweeks)) {
      throw `Invalid gameweek Number. Provided number '${gameweek}', schedule size is '${this.schedule.length}'`;
    }

    this.schedule[gameweek].push(game);
    this.hasGameMap.get(game.home.teamNumber)[gameweek] = true;
    this.hasGameMap.get(game.away.teamNumber)[gameweek] = true;
  }

  teamHasGameInGameweek = (team, gameweek) => {
    return this.hasGameMap.get(team.teamNumber)[gameweek];
  }

  printSchedule = () => {
    console.log("Schedule:");
    for (let gameweek = 0; gameweek < this.schedule.length; gameweek++) {
      console.log(`\tGameweek ${gameweek}:`);
      for (let gameIndex = 0; gameIndex < this.schedule[gameweek].length; gameIndex++) {
        const game = this.schedule[gameweek][gameIndex];
        console.log(`\t\t${game.home.teamName} (${game.home.teamNumber}) vs. ${game.away.teamName} (${game.away.teamNumber})`);
      }
    }
  }

}
