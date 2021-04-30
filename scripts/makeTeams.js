//test script to make teams and add them to an array

let numberOfTeams = 0;
let teamList = [];
let cloneCount = 0;
let childCount = 0;
const saveTeamBtn = document.getElementById("saveTeamBtn");
const scheduleBtn = document.getElementById("scheduleBtn");

const saveTeam = (teamList) => {

    const teamName = document.getElementsByName("teamName")[0].value;
    const teamColor = document.getElementsByName("teamColor")[0].value;
    const teamLogo = document.getElementsByName("teamLogo")[0].value;

    numberOfTeams++;
    let temp = new Team(numberOfTeams, teamName, teamColor, teamLogo);
    teamList.push(temp);
    
    

}

const clonePath = (nodeObject) => {
    const clonedPath = nodeObject.cloneNode(true);
    cloneCount++;
    clonedPath.id = clonedPath.id + cloneCount;
    const parent = nodeObject.parentElement;
    parent.appendChild(clonedPath);
}



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

saveTeamBtn.addEventListener("click", () => {
    
    saveTeam(teamList);
    console.log(teamList);
});

scheduleBtn.addEventListener("click", () => {
    
        const generator = new Generator (teamList);
        generator.createSchedule(3);
        console.log(generator);
        console.log(generator.schedule["schedule"].length);
        
        generator.displaySchedule();
        
});

