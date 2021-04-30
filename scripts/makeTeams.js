//test script to make teams and add them to an array

let numberOfTeams = 0;
let teamList = [];
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

saveTeamBtn.addEventListener("click", () => {
    
    saveTeam(teamList);
    //testFunc();
    console.log(teamList);
});

scheduleBtn.addEventListener("click", () => {
    
        const generator = new Generator (teamList);
        generator.createSchedule(2);
        console.log(generator);
        console.log(generator.schedule["schedule"].length);
        
        generator.displaySchedule();
        
});

