let container = document.getElementById("container");
let loaded = false;

loadImages(0, 50);

document.addEventListener("scroll", function() {
  // calculating if page reached the bottom
  if (
    document.documentElement.clientHeight + window.pageYOffset >=
    document.body.offsetHeight
  ) {
    // then loading more photos
      loadImages(25, 50);
  }
});

function loadingBar() {
  let blackScreen = document.createElement("div");
  blackScreen.setAttribute("id", "black-screen");
  let loadingCircle = document.createElement("div");
  loadingCircle.setAttribute("id", "circle");
  blackScreen.appendChild(loadingCircle);
  document.body.appendChild(blackScreen);
}

function loadImages(startValue, finishValue) {
  //calling 'loading' circle
  loadingBar();

  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", "https://randomuser.me/api/?results=50", true);
  xhttp.onload = function() {
    document.body.removeChild(document.getElementById("black-screen"));
    if (this.status === 200) {
      let jsonText = JSON.parse(this.responseText);
      let counter = 0;
      let pElement = document.createElement("p");
      for (let i = startValue; i < finishValue; i++) {
        counter++;

        let photo = document.createElement("img");
        photo.setAttribute("src", jsonText.results[i].picture.large);
        photo.setAttribute("class", "photo");

        let photoElement = document.createElement("span");
        photoElement.setAttribute("class", "photo-span");
        photoElement.appendChild(photo);

        pElement.appendChild(photoElement);

        if (counter === 5) {
          container.appendChild(pElement);
          pElement = document.createElement("p");
          counter = 0;
        }
      }
    }
  };
  xhttp.send();
}
