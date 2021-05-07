// test script to make teams and add them to an array

let numberOfTeams = 0;
let teamList = [];
let cloneCount = 0;
let childCount = 0;

const randomizeArray = (array) => {
    let currentIndex = array.length;
        let temp, randomIndex;

        while ( 0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temp = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temp;
        }
            
        return array;
}

const gridWrapper = document.getElementById("gridWrapper");

const insertVersus = () => {
    const flexContainer = document.createElement("div");
    flexContainer.classList.add("flexContainer");

    const versus = document.createElement("div");
    versus.classList.add("versus");
    versus.textContent += "VS.";

    gridWrapper.appendChild(flexContainer);
    flexContainer.appendChild(versus);
}

const countChildren = () => {
    childCount++;
    if (childCount % 2 === 1) {
        insertVersus();
    };
}

const clonePath = (nodeObject) => {
    const clonedPath = nodeObject.cloneNode(true);
    cloneCount++;
    clonedPath.id = clonedPath.id + cloneCount;
    const parent = nodeObject.parentElement;
    parent.appendChild(clonedPath);
}


const postTeam = (teamObject, destination) => {
    
    // make additions to the DOM for the home team
    // create the flexContainer div and add the class flexContainer
    const flexContainer = document.createElement("div");
    flexContainer.classList.add("flexContainer");
    destination.appendChild(flexContainer);

    // create the testContainer div and add the class testContainer
    const testContainer = document.createElement("div");
    testContainer.classList.add("testContainer");
    flexContainer.appendChild(testContainer);

    // get team name
    const teamName = document.createElement("p");
    teamName.classList.add("teamName");
    teamName.textContent += teamObject["teamName"];

    // add team name to DOM
    testContainer.appendChild(teamName);

    // get team color and apply class to testContainer
    const teamColor = teamObject["teamColor"];
    testContainer.classList.add(teamColor);

    // get team logo
    const teamLogo = teamObject["teamLogo"];
    const logo = document.getElementById(teamLogo);
    clonePath(logo);
    const newLogo = document.getElementById(teamLogo + cloneCount);
    newLogo.classList.add("logoChoice");

    // make logo background
    const logoBack = document.createElement("div");
    logoBack.classList.add("logoBack");

    // add these to the dom
    testContainer.appendChild(newLogo);
    testContainer.appendChild(logoBack);
}

const displaySchedule = (schedule) => {

    for (let i = 0; i < schedule.length; i++) {
        // create a flex container for the gameweek
        const gameweekHeader = document.createElement("h2");
        gameweekHeader.textContent += "Gameweek" + " " + (i + 1);
        gameweekHeader.classList.add("gameweek");
        gameweekHeader.classList.add("flexContainer");

        // add this container to the DOM
        gridWrapper.appendChild(gameweekHeader);

        const gameweekArray = schedule[i];

        for (let j = 0; j < schedule[i].length; j++) {
            const home = gameweekArray[j].home;
            const away = gameweekArray[j].away;
            // grab the team objects for home and away within the object for a game
            
            postTeam(home, gridWrapper);
            countChildren();
            postTeam(away, gridWrapper);
            countChildren();
        }
    }
}

const teamPlates = document.getElementById("teamPlates");

const saveTeam = () => {

    const teamName = document.getElementsByName("teamName")[0].value;
    const teamColor = document.getElementsByName("teamColor")[0].value;
    const teamLogo = document.getElementsByName("teamLogo")[0].value;

    const team = new Team(numberOfTeams++, teamName, teamColor, teamLogo);
    teamList.push(team);
    postTeam(team, teamPlates);
}

const makeRandomTeams = () => {

    teamList = [];
    numberOfTeams = 0;

    let colors = ["blue", "red", "green", "purple", "yellow", "orange", "lightblue", "white"];
    let logos = ["benderSVG", "frySVG", "leelaSVG", "nibblerSVG", "professorSVG", "zoidbergSVG", "jakeTheDogSVG", "stormtrooperSVG"];
    let teamNames = ["Cardinals", "Falcons", "Ravens", "Bills", "Panthers", "Bears", "Bengals", "Browns", "Cowboys", "Broncos", "Lions", "Packers", "Texans", "Colts", "Jaguars", "Chiefs", "Chargers", "Rams", "Dolphins", "Vikings", "Patriots", "Saints", "Giants", "Jets", "Raiders", "Eagles", "Steelers", "49ers", "Seahawks", "Buccaneers", "Titans"];

    randomizeArray(colors);
    randomizeArray(logos);
    randomizeArray(teamNames);

    const numberTeams = document.getElementsByName("numberOfTeams")[0].value;

    for (let i = 0; i < numberTeams; i++) {

        const team = new Team(i, teamNames[i], colors[i], logos[i]);
        teamList.push(team);
        postTeam(team, teamPlates);
        numberOfTeams++;

    }



}

const removeTeamsFromDOM = (parentNode) => {
    while (parentNode.firstChild) {

        parentNode.removeChild(parentNode.lastChild);
    }
}


const saveTeamBtn = document.getElementById("saveTeamBtn");

saveTeamBtn.addEventListener("click", () => {
    if (teamList.length < 9) {
        console.log(teamList);
        saveTeam();
    }
    
});

const scheduleBtn = document.getElementById("scheduleBtn");
scheduleBtn.addEventListener("click", () => {
    if (teamList.length % 2 === 1) {
        const bye = new Team(numberOfTeams++, "BYE", "bye", "bye");
        teamList.push(bye);
    }
    saveTeamBtn.disabled = true;
    const generator = new Generator(teamList);
    
    console.log(generator);
    //console.log(generator.gamePool);

    generator.createGamePool();
    //generator.printGamePool();
    //generator.displayGamePool();
    removeTeamsFromDOM(gridWrapper);
    
    
    
    
    generator.generateUniqueGameweeks();

    generator.makeSchedule();
    
});

const randomizeBtn = document.getElementById("randomizeBtn");
randomizeBtn.addEventListener("click", () => {
    
    removeTeamsFromDOM(teamPlates);
    makeRandomTeams();

})
