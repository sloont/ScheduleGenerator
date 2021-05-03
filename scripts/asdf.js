addGameToGameWeek = () => {
    const team = this.teams[0];
    const teamGames = this.gamePool.get(team.teamNumber);
    const gameChoice = teamGames.get(Object.away.teamNumber);

    console.log(team);
    console.log(teamGames);
    console.log(gameChoice);
}