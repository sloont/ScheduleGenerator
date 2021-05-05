// test script to make teams and add them to an array

let numberOfTeams = 0;
let teamList = [];
let cloneCount = 0;
let childCount = 0;

const insertVersus = () => {
    const flexContainer = document.createElement("div");
    flexContainer.classList.add("flexContainer");

    const versus = document.createElement("div");
    versus.classList.add("versus");
    versus.textContent += "VS.";

    const gridWrapper = document.getElementById("gridWrapper");
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

const postTeam = (teamObject) => {
    const gridWrapper = document.getElementById("gridWrapper");
    // make additions to the DOM for the home team
    // create the flexContainer div and add the class flexContainer
    const flexContainer = document.createElement("div");
    flexContainer.classList.add("flexContainer");
    gridWrapper.appendChild(flexContainer);

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
    // grab the gridWrapper
    const gridWrapper = document.getElementById("gridWrapper");

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
            postTeam(home);
            countChildren();
            postTeam(away);
            countChildren();
        }
    }
}


const saveTeam = () => {
    const teamName = document.getElementsByName("teamName")[0].value;
    const teamColor = document.getElementsByName("teamColor")[0].value;
    const teamLogo = document.getElementsByName("teamLogo")[0].value;

    const team = new Team(numberOfTeams++, teamName, teamColor, teamLogo);
    teamList.push(team);
}

const saveTeamBtn = document.getElementById("saveTeamBtn");
saveTeamBtn.addEventListener("click", () => {
    saveTeam();
    console.log(teamList);
});

const scheduleBtn = document.getElementById("scheduleBtn");
scheduleBtn.addEventListener("click", () => {
    const generator = new Generator(teamList, 17);
    //const schedule = generator.createSchedule(10);

    //schedule.printSchedule();

    //displaySchedule(schedule);
    //console.log(schedule);
    console.log(generator);
    console.log(generator.gamePool);

    generator.createGamePool();
    generator.printGamePool();
    generator.displayGamePool();

    console.log(generator.combinationsObject);
    console.log(generator.indexObject);

    //console.log(generator.generateCombinationsMap(generator.combinationsMap));
    
    /*const indexObject = {0: 45, 1: 23, 2: 5, 3: 1};
    generator.placeCombinationsInMap(indexObject);

    console.log(generator.combinationsMap.get(45).get(23).get(5).get(1));
    console.log(generator.combinationsMap);

    console.log(generator.indexCombinations());*/

    console.log(generator.generateCombinationsMap(generator.combinationsMap));
    generator.makeGameweekArrayFromCombinationsMap(generator.combinationsMap);
    console.log(generator.uniqueGameweeksArray);
});
