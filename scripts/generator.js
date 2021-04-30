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
        this.playedCombinations = [[1,2],[3,4],[5,6],[7,8]];

        this.gameweekTransition();
    }

    gameweekTransition = () => {
        for (let x = 0; x < this.teams.length; x++) {
            this.teamsNeedGames.push(this.teams[x]);
        }
    }

    checkIfPlayed = (home, away) => {
        for (let i = 0; i < this.playedCombinations.length; i++) {
            if (this.playedCombinations[i][0] === home.teamNumber && this.playedCombinations[i][1] === away.teamNumber) {
                return true;
            }
        }
    }

    /**
     * 
     * @param {Number} gameweeks The number of the gameweek (or the index into the internal schedule array)
     */
    createSchedule = (gameweeks) => {
        this.schedule = new Schedule(this.teams, gameweeks);
    
        for (let i = 0; i < gameweeks; i++) {
            let counter = 1;
            while (this.teamsNeedGames.length > 0) {
                
                let home = this.teamsNeedGames[0];
                if (counter >= this.teamsNeedGames.length) {
                    counter = 1;
                }
                let away = this.teamsNeedGames[counter];

                if(!this.checkIfPlayed(home, away)) {
                    console.log("haven't played");
                    this.schedule.addGameToGameweek({H: home, A: away}, i);
                    this.playedCombinations.push([home.teamNumber, away.teamNumber]);
                    
                    this.teamsWithGames.push(home);
                    this.teamsWithGames.push(away);

                    this.teamsNeedGames.splice(0,1);
                    console.log(this.teams.length);
                    console.log(this.teamsNeedGames.length);
                    this.teamsNeedGames.splice(counter - 1 ,1);

                    
                
                } else {
                    counter++;
                    console.log("counterIncrement");
                }
    
                    /*this.schedule.addGameToGameweek({H: home, A: away}, i);
    
                    this.teamsWithGames.push(home);
                    this.teamsWithGames.push(away);
    
                    this.teamsNeedGames.splice(0,1);
                    console.log(this.teams.length);
                    console.log(this.teamsNeedGames.length);
                    this.teamsNeedGames.splice(counter - 1 ,1);
    
                    this.playedCombinations.push([home.teamNumber, away.teamNumber]);
    
                } else {
                    counter++;
                    console.log("counterIncrement");
                }
    
                playedBool = false;*/
            }
    
            this.teamsWithGames = [];
            this.gameweekTransition();
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

const countChildren  = () => {
    childCount++;

    if (childCount % 2 === 1) {
        insertVersus();
    };
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



