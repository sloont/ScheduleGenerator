//Class to represent the generator

class Generator {

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
        
        this.schedule = new Schedule(this.teams, gameweeks);

        for (let i = 0; i < gameweeks; i++) {
            
            while (this.teamsNeedGames.length > 0) {

                let team = this.teamsNeedGames[0];

                this.schedule.addGameToGameweek({H: team, A: this.teamsNeedGames[1]}, i);

                this.teamsWithGames.push(team);
                this.teamsWithGames.push(this.teamsNeedGames[1]);

                this.teamsNeedGames.splice(0,1);
                console.log(this.teams.length);
                console.log(this.teamsNeedGames.length);
                this.teamsNeedGames.splice(0,1);
               
            }
        }




        console.log(this.schedule);
    }

    displaySchedule = () => {

        //grab the gridWrapper
        const gridWrapper = document.getElementById("gridWrapper");
        const scheduleArray = this.schedule["schedule"]
        for (let i = 0; i < scheduleArray.length; i++) {
            //create a flex container for the gameweek
            const gameweekHeader = document.createElement("h2");
            gameweekHeader.textContent += "Gameweek" + " " + (i + 1);
            gameweekHeader.classList.add("gameweek");
            gameweekHeader.classList.add("flexContainer");
    
            //add this container to the DOM
            gridWrapper.appendChild(gameweekHeader);
    
            const gameweekArray = scheduleArray[i];
            console.log("outer");

            for (let j = 0; j < scheduleArray[i].length; j++) {
                const home = gameweekArray[j]["H"];
                const away = gameweekArray[j]["A"];
                //grab the team objects for home and away within the object for a game
                postTeam(home);

                //track number of children added to the DOM
                countChildren();

                postTeam(away);
                
                countChildren();
                
                
                console.log("inner");
            }
        }
    }
}

const postTeam = (teamObject) => {
    const gridWrapper = document.getElementById("gridWrapper");
    //make additions to the DOM for the home team
    //create the flexContainer div and add the class flexContainer
    const flexContainer = document.createElement("div");
    flexContainer.classList.add("flexContainer");
    gridWrapper.appendChild(flexContainer);

    //create the testContainer div and add the class testContainer
    const testContainer = document.createElement("div");
    testContainer.classList.add("testContainer");
    flexContainer.appendChild(testContainer);


    //get team name
    const teamName = document.createElement("p");
    teamName.classList.add("teamName");
    teamName.textContent += teamObject["teamName"];

    //add team name to DOM
    testContainer.appendChild(teamName);

    //get team color and apply class to testContainer
    const teamColor = teamObject["teamColor"];
    testContainer.classList.add(teamColor);

    //get team logo
    const teamLogo = teamObject["teamLogo"];
    const logo = document.getElementById(teamLogo);
    clonePath(logo);
    const newLogo = document.getElementById(teamLogo + cloneCount);
    newLogo.classList.add("logoChoice");

    //make logo background
    const logoBack = document.createElement("div");
    logoBack.classList.add("logoBack");

    //add these to the dom
    testContainer.appendChild(newLogo);
    testContainer.appendChild(logoBack);
}

const countChildren  = () => {
    childCount++;

    if (childCount % 2 === 1) {
        insertVersus();
    };
}
