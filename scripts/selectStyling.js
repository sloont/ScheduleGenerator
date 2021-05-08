//js file for the logic on the custom select menu for number of teams


/* Look for any elements with the class "custom-select": */
let customSelectArray = document.getElementsByClassName("custom-select");

for (let i = 0; i < customSelectArray.length; i++) {

  let select = customSelectArray[i].getElementsByTagName("select")[0];
  
  /* For each element, create a new div that will act as the selected item: */
  let selectedDiv = document.createElement("div");
  selectedDiv.setAttribute("class", "select-selected");
  selectedDiv.innerHTML = select.options[select.selectedIndex].innerHTML;
  customSelectArray[i].appendChild(selectedDiv);

  /* For each element, create a new DIV that will contain the option list: */
  let allOptionsDiv = document.createElement("div");
  allOptionsDiv.setAttribute("class", "select-items select-hide");
  for (let j = 1; j < select.length; j++) {

    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    let singleOptionDiv = document.createElement("div");
    singleOptionDiv.innerHTML = select.options[j].innerHTML;
    singleOptionDiv.addEventListener("click", function(e) {

        // When an item is clicked, update the original select box,
        //and the selected item: 
        let clicked, previousSibling, sameAsSelectedNode;
        clicked = this.parentNode.parentNode.getElementsByTagName("select")[0];
        
        previousSibling = this.parentNode.previousSibling;

        for (i = 0; i < clicked.length; i++) {

          if (clicked.options[i].innerHTML == this.innerHTML) {

            clicked.selectedIndex = i;
            previousSibling.innerHTML = this.innerHTML;
            sameAsSelectedNode = this.parentNode.getElementsByClassName("same-as-selected");
            
            for (let k = 0; k < sameAsSelectedNode.length; k++) {

              sameAsSelectedNode[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }

        previousSibling.click();
    });

    allOptionsDiv.appendChild(singleOptionDiv);
  }

  customSelectArray[i].appendChild(allOptionsDiv);

  selectedDiv.addEventListener("click", function(e) {

    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);

    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

const closeAllSelect = (chosenSelect) => {

  /* A function that will close all select boxes in the document,
  except the current select box: */
  
  let options = document.getElementsByClassName("select-items");
  let selected = document.getElementsByClassName("select-selected");
  let notChosen = [];
  
  for (let i = 0; i < selected.length; i++) {

    if (chosenSelect == selected[i]) {

      notChosen.push(i)

    } else {

      selected[i].classList.remove("select-arrow-active");

    }
  }
  for (let i = 0; i < options.length; i++) {

    if (notChosen.indexOf(i)) {

      options[i].classList.add("select-hide");

    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);