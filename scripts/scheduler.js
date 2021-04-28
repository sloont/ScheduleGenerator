// A class used to schedule an array of teams based on a set of constraints
class Scheduler {
    /**
     * Constructor
     * @param {Array} teams An array of Team objects used to schedule
     */
    constructor(teams) {
      this.teams = teams;
  
      this.constraints = [];
    }
  
    /**
     * A method that internally stores a constraint and then uses it to evaluate any future schedule
     * @param {Function} constraintFunction A Function object that takes in an Array of teams and outputs a boolean specifying whether the constraint is met
     */
    addConstraint = (constraintFunction) => {
      this.constraints.push(constraintFunction);
    }
  
    /**
     * A method creates a schedule
     * @param {Number} gameweeks The number of gameweeks in the schedule
     */
    createSchedule = (gameweeks) => {
      let schedule = new Schedule(this.teams, gameweeks);
  
      for (let gameweek = 0; gameweek < gameweeks; gameweek++) {
        const team1Number = Math.floor(Math.random() * this.teams.length);
        const team2Number = Math.floor(Math.random() * this.teams.length);
        const game = { H: this.teams[team1Number], A: this.teams[team2Number] };
        schedule.addGameToGameweek(game, gameweek);
      }
  
      console.log(schedule.schedule);
    }
  
  }