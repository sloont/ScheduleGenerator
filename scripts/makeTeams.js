//test script to make teams and add them to an array

let numberOfTeams = 0;
let teamList = [];
const saveTeamBtn = document.getElementById("saveTeamBtn");

const saveTeam = () => {

    const teamName = document.getElementsByName("teamName")[0].value;
    const teamColor = document.getElementsByName("teamColor")[0].value;
    const teamLogo = document.getElementsByName("teamLogo")[0].value;

    numberOfTeams++;

    teamList.push(new Team(numberOfTeams, teamName, teamColor, teamLogo));


}

saveTeamBtn.addEventListener("click", () => {
    
    saveTeam();
    testFunc();
    console.log(teamList);
});

