const testFunc = () => {

    const testContainer = document.createElement("div");
    testContainer.classList.add("testContainer");

    const logo = document.getElementById("benderSVG");
    clonePath(logo);
    const newLogo = document.getElementById("benderSVG" + cloneCount);
    newLogo.classList.add("logoChoice");

    const logoBack = document.createElement("div");
    logoBack.classList.add("logoBack");

    const testDiv = document.getElementById("test");

    testDiv.appendChild(testContainer);
    
    testContainer.appendChild(newLogo);
    testContainer.appendChild(logoBack);

    //adding Team Name now

    const teamName = document.createElement("p");
    teamName.classList.add("teamName");
    teamName.textContent += "The Bender andS";

    testContainer.appendChild(teamName);

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
