var imageBlock = document.getElementById("image").style;
var widthInput = document.getElementById("width-input");
var heightInput = document.getElementById("height-input");
var thicknessInput = document.getElementById("thickness-input");
var colorInput = document.getElementById("color-input");
var alterInput = document.getElementById("alter-input");


alterInput.oninput = e =>{
  let reg = /^[a-zA-Z]*$/;
  if(!reg.test(e.target.value)){
    e.target.value = ""; 
  }
  checkAlterInput(alterInput);
}

function changeImage() {
  if (
    isNaN(widthInput.value) ||
    isNaN(heightInput.value) ||
    isNaN(thicknessInput.value)
  ) {
    alert("Поле ширини, висоти та товщини мають містити числове значення");
  } else {
    setImageSetttings();
  }
  checkErrors();
}

function checkErrors() {
  checkWidthInput(widthInput);
  checkHeightInput(heightInput);
  checkThicknessInput(thicknessInput);
  checkColorInput(colorInput);
}
function setImageSetttings(){
  imageBlock.width = widthInput.value + "px";
  imageBlock.height = heightInput.value + "px";
  imageBlock.borderColor = colorInput.value;
  imageBlock.borderWidth = thicknessInput.value + "px";
  document.getElementById("image").alt = alterInput.value;
}



function checkWidthInput(widthInput){
  if (isNaN(widthInput.value)) {
    widthInput.style.borderColor = "red";
    widthInput.style.borderWidth = "2px";
  } else {
    widthInput.style.borderColor = "gray";
    widthInput.style.borderWidth = "1px";
  }
}

function checkHeightInput(heightInput){
  if (isNaN(heightInput.value)) {
    heightInput.style.borderColor = "red";
    heightInput.style.borderWidth = "2px";
  } else {
    heightInput.style.borderColor = "gray";
    heightInput.style.borderWidth = "1px";
  }
}

function checkThicknessInput(thicknessInput){
  if (isNaN(thicknessInput.value)) {
    thicknessInput.style.borderColor = "red";
    thicknessInput.style.borderWidth = "2px";
  } else {
    thicknessInput.style.borderColor = "gray";
    thicknessInput.style.borderWidth = "1px";
  }
}

function checkColorInput(colorInput){
  if (colorInput.value == "") {
    colorInput.style.borderColor = "red";
    colorInput.style.borderWidth = "2px";
  } else {
    colorInput.style.borderColor = "gray";
    colorInput.style.borderWidth = "1px";
  }
}

function checkAlterInput(alterInput){
  if (alterInput.value == "") {
    alterInput.style.borderColor = "red";
    alterInput.style.borderWidth = "2px";
  } else {
    alterInput.style.borderColor = "gray";
    alterInput.style.borderWidth = "1px";
  }
}