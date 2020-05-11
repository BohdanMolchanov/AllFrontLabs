const tableElement = document.getElementById("city-table-body");
document.querySelector("#city-add").addEventListener("click", addCity);
const diagramElement = document.getElementById("diagram");
let diagramArray = [];
let tableArray = [];
let count = 0;
let tempIndex = 0;

tableElement.addEventListener("click", deleteTableRow);
tableElement.addEventListener("click", refreshDiagram);
diagramElement.addEventListener("mouseover", function(e) {
  const rectangle = e.target.parentElement.childNodes;
  console.log(e);
});

// On edit action
tableElement.addEventListener("input", function(e) {
  console.log(e);
  const nameRow = e.target.parentElement.childNodes;
  // Converts array and gets index of element
  let index = Array.from(tableElement.childNodes).indexOf(
    e.target.parentElement
  );
  // Sets values to everything
  tableArray[index].type = nameRow[1].innerText;
  diagramArray[index].childNodes[1].innerText = tableArray[index].type;

  tableArray[index].value = parseInt(nameRow[2].innerText, 10);
  refreshDiagram();
});

// Deletes row
function deleteTableRow(event) {
  if (event.target.classList.contains("delete-button")) {
    const tableCell = event.target;
    const tableRow = tableCell.parentElement.parentElement;
    for (let i = 0; i < tableArray.length; i++) {
      if (
        tableRow.childNodes[1].innerText === tableArray[i].type &&
        parseInt(tableRow.childNodes[2].innerText, 10) === tableArray[i].value
      ) {
        tableArray.splice(i, 1); //removes 1 element starts from i
        diagramArray[i].remove(); // removes element from page
        diagramArray.splice(i, 1);
        tableRow.remove();
        count--;
      }
    }
  }
}

function addCity() {
  const value1 = prompt("City"); //calling window with input
  const value2 = prompt("Distance");
  if (checkIfCityExists(value1)) {
    if (value1 !== null && value2 !== null) {
      //checking if values are not inserted
      if (value1 !== "" && value2 !== "") {
        tableArray[count] = { type: value1, value: parseInt(value2, 10) };
        createRow(value1, value2);
        addToDiagram(value1, value2);
      } else alert("Please fill all values");
    } else {
      alert("You have cancelled this operation");
    }
    refreshDiagram();
  } else alert("This name already exists");
}

function checkIfCityExists(value) {
  for (let i = 0; i < tableArray.length; i++) {
    if (tableArray[i].type === value) return false;
  }
  return true;
}

function refreshDiagram() {
  let maxHeight = parseInt(tableArray[0].value, 10); //selects first value as max
  let iterator = 0;
  //finds max value from all values
  for (let i = 1; i < tableArray.length; i++) {
    if (maxHeight < parseInt(tableArray[i].value, 10)) {
      maxHeight = parseInt(tableArray[i].value, 10);
      iterator = i;
    }
  }
  //sets height for all elements
  diagramArray[iterator].style.height = "100%";
  for (let i = 0; i < diagramArray.length; i++) {
    if (tableArray[iterator].value === tableArray[i].value) {
      diagramArray[i].style.height = "100%";
    } else {
      diagramArray[i].style.height =
        (parseInt(tableArray[i].value, 10) * 100) / maxHeight + "%";
    }
  }
}

function addToDiagram(value1) {
  const newDiagramEl = document.createElement("div");
  const rectangle = document.createElement("div");
  const text = document.createElement("div");

  newDiagramEl.setAttribute("class", "city");
  rectangle.setAttribute("class", "rectangle");
  text.setAttribute("class", "text");

  //sets random color for every diagram element
  let randomColor = Math.floor(Math.random() * 16777215).toString(16);

  rectangle.style.backgroundColor = "#" + randomColor;
  text.innerText = value1;

  newDiagramEl.appendChild(rectangle);
  newDiagramEl.appendChild(text);

  diagramElement.appendChild(newDiagramEl);
  diagramArray[count] = newDiagramEl;
  count++;
}

function createRow(value1, value2) {
  const newRow = document.createElement("tr");
  const colOne = document.createElement("td");
  const colTwo = document.createElement("td");
  const colThree = document.createElement("td");
  const deleteLink = document.createElement("a");

  colTwo.innerText = value1;
  colThree.innerText = value2;
  colTwo.contentEditable = "true";
  colThree.contentEditable = "true";
  deleteLink.innerText = "Видалити";
  deleteLink.className = "delete-button";

  colOne.appendChild(deleteLink);
  newRow.appendChild(colOne);
  newRow.appendChild(colTwo);
  newRow.appendChild(colThree);

  tableElement.appendChild(newRow);
}
