let childCount = 0;

const testFunc = () => {
    //create the testContainer div and add the class testContainer
    const testContainer = document.createElement("div");
    testContainer.classList.add("testContainer");

    //grab logoChoice from the html form
    const logoChoice = document.getElementsByName("teamLogo")[0].value;

    //find the logo in the svgCollection and clone it (gains a new ID)
    const logo = document.getElementById(logoChoice);
    clonePath(logo);

    //grab newLogo svg (the one with the new ID) the original stays put
    const newLogo = document.getElementById(logoChoice + cloneCount);
    //add logoChoice class to the svg
    newLogo.classList.add("logoChoice");

    //create a div for the logo background and add class logoBack
    const logoBack = document.createElement("div");
    logoBack.classList.add("logoBack");

    //grab the test container that exists in the html already
    const testDiv = document.getElementById("test");

    //add testContainer to test
    testDiv.appendChild(testContainer);
    
    //add newLogo and logoBack to the testContainer
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

    //for now this variable is how we make unique the svg clones
    childCount++;

    if (childCount % 2 === 1) {
        insertVersus();
    }

};

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
    const versus = document.createElement("div");
    versus.classList.add("versus");
    versus.textContent += "VS.";

    const testDiv = document.getElementById("test");
    testDiv.appendChild(versus);
}