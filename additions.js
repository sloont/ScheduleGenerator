let childCount = 0;

const testFunc = () => {

    const testContainer = document.createElement("div");
    testContainer.classList.add("testContainer");

    const logoChoice = document.getElementsByName("teamLogo")[0].value;
    const logo = document.getElementById(logoChoice);
    clonePath(logo);
    const newLogo = document.getElementById(logoChoice + cloneCount);
    newLogo.classList.add("logoChoice");

    const logoBack = document.createElement("div");
    logoBack.classList.add("logoBack");

    const testDiv = document.getElementById("test");

    testDiv.appendChild(testContainer);
    
    testContainer.appendChild(newLogo);
    testContainer.appendChild(logoBack);

    //adding Team Name from HTML form

    const teamName = document.createElement("p");
    teamName.classList.add("teamName");
    teamName.textContent += document.getElementsByName("teamName")[0].value;

    testContainer.appendChild(teamName);

    //teamColor from HTML form
    const teamColor = document.getElementsByName("teamColor")[0].value;
    testContainer.classList.add(teamColor.toLowerCase().split(' ').join(''));

    childCount++;

    if (childCount % 2 === 1) {
        insertDot();
    }

};

const testBtn = document.getElementById("testBtn");

testBtn.addEventListener("click", () => {
    testFunc();
});

let cloneCount = 0;
const clonePath = (nodeObject) => {
    const clonedPath = nodeObject.cloneNode(true);
    cloneCount++;
    clonedPath.id = clonedPath.id + cloneCount;
    const parent = nodeObject.parentElement;
    parent.appendChild(clonedPath);
}


//new test 
const insertDot = () => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    dot.textContent += "VS.";

    const testDiv = document.getElementById("test");
    testDiv.appendChild(dot);
}