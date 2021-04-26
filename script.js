const Team = (teamName, logo, color, lastSeasonPlace) => {
    this.teamName = teamName;
    this.logo = logo;
    this.color = color;
    this.lastSeasonPlace = lastSeasonPlace;

    this.record = [0,0,0];
    this.needsHomeGame = false;
    //this.canHaveBye = true;   lets not worry about byes for now

    this.schedule = {};


    this.scheduleDifficulty = 0;
}

const team1 = new Team(param1, param2, param3, param4);
const team2 = new Team(param1, param2, param3, param4);
const team3 = new Team(param1, param2, param3, param4);
const team4 = new Team(param1, param2, param3, param4);

const team5 = new Team(param1, param2, param3, param4);
const team6 = new Team(param1, param2, param3, param4);
const team7 = new Team(param1, param2, param3, param4);
const team8 = new Team(param1, param2, param3, param4);
/*
<option value="1e90ff">Blue</option>
<option value="#b22222">Red</option>
<option value="#3cb371">Green</option>
<option value="#ba55d3">Purple</option>

<option value="#ffd700">Yellow</option>
<option value="#ff7f50">Orange</option>
<option value="#87ceeb">Light Blue</option>
<option value="#fffafa">White</option>
*/


