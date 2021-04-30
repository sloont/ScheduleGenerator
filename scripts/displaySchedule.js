//rewrite of the functions in additions.js to display the schedule altogether

let childCount = 0;

const displaySchedule = (scheduleArray) => {

    //grab the gridWrapper
    const gridWrapper = document.getElementById("gridWrapper");

    for (let i = 0; i < scheduleArray.length; i++) {
        //create a flex container for the gameweek
        const gameweekHeader = document.createElement("h2");
        gameweekHeader.textContent += "Gameweek" + i;
        gameweekHeader.classList.add("gameweek");
        gameweekHeader.classList.add("flexContainer");

        //add this container to the DOM
        gridWrapper.appendChild(gameweekHeader);

        const gameweekArray = scheduleArray[i];
        console.log("outer");

        /*for (let j = 0; j < scheduleArray[i].length; j++) {
            //grab the team objects for home and away within the object for a game
            const home = gameweekArray[j]["H"];
            const away = gameweekArray[j]["A"];

            //make additions to the DOM for the home team
            //create the testContainer div and add the class testContainer
            const homeTestContainer = document.createElement("div");
            homeTestContainer.classList.add("testContainer");

            //create the flexContainer div and add the class flexContainer
            const homeFlexContainer = document.createElement("div");
            homeFlexContainer.classList.add("flexContainer");

            //add test and flex to DOM
            gridWrapper.appendChild(homeFlexContainer);
            homeFlexContainer.appendChild(homeTestContainer);

            //get team name
            const homeTeamName = document.createElement("p");
            homeTeamName.classList.add("teamName");
            homeTeamName.textContent += home["teamName"];

            //add team name to DOM
            homeTestContainer.appendChild(homeTeamName);

            //get team color and apply class to testContainer
            const homeTeamColor = home["teamColor"];
            homeTestContainer.classList.add(homeTeamColor);

            //get team logo
            const homeTeamLogo = home["teamLogo"];
            const homeLogo = document.getElementById(homeTeamLogo);
            clonePath(homeLogo);
            const newHomeLogo = document.getElementById(homeTeamLogo + cloneCount);
            newHomeLogo.classList.add("logoChoice");

            //make logo background
            const homeLogoBack = document.createElement("div");
            homeLogoBack.classList.add("logoBack");

            //add these to the dom
            homeTestContainer.appendChild(newHomeLogo);
            homeTestContainer.appendChild(homeLogoBack);
            gridWrapper.appendChild(homeTestContainer);

            //track number of children added to the DOM
            childCount++;

            if (childCount % 2 === 1) {
                insertVersus();
            };
            console.log("inner");
        }*/
    }

}





let cloneCount = 0;
const clonePath = (nodeObject) => {
    const clonedPath = nodeObject.cloneNode(true);
    cloneCount++;
    clonedPath.id = clonedPath.id + cloneCount;
    const parent = nodeObject.parentElement;
    parent.appendChild(clonedPath);
}


//new test 
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