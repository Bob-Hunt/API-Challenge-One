// URL variables
const baseUrl = 'https://ghibliapi.herokuapp.com/';
const filmsUrl = `${baseUrl}films`;
const peopleUrl = `${baseUrl}people`;
const speciesUrl = `${baseUrl}species`;
const locationsUrl = `${baseUrl}locations`;
const vehiclesUrl = `${baseUrl}vehicles`;

let myUrl;
let english = true;
let showHideDiv = document.querySelector('.translate-container');
showHideDiv.setAttribute('id', 'hide-translate-container');

let displayItems;
let bodyWrapperImg = document.querySelector(".body-wrapper-image");
let displayOne = document.getElementById('ul-one');
let displayTwo = document.getElementById('ul-two');
let displayThree = document.getElementById('ul-three');


// accepts an event from 1 of 5 different HTML buttons and calls getFetch()
// with different parameters based on which button is clicked.
function chooseInput(mybutton, language){
    console.log(mybutton.id);
    switch (mybutton.id) {
        case 'films':
            getFetch(filmsUrl, 'english');
            break;
        case 'people':
            getFetch(peopleUrl, 'people');
            break;
        case 'species':
            getFetch(speciesUrl, 'species');
            break;
        case 'locations':
            getFetch(locationsUrl, 'locations');
            break;
        case 'vehicles':
            getFetch(vehiclesUrl, 'vehicles');
            break;
        default:
            break;
    }
}


// Determines the second parameter to pass into getFetch(),
// which will determine which key:value will be pulled from the films API.
function titleTranslate(transBtn){
    switch (transBtn.id) {
        case 'english':
            getFetch(filmsUrl, 'english');
            break;
        case 'japanese':
            getFetch(filmsUrl, 'japanese');
            break;
        default:
            break;
    }
}


// getFetch function **Does way too much!
// Should be refactored into multiple functions.
async function getFetch(myParameter, language){   
    await fetch(myParameter)
        .then(function(response){
            return response.json();
        })
        .then((data) => {
            console.log(data.length);
            console.log(data);

            // Removes results from previous button before adding results from current button.
            while (displayOne.firstChild) {
                displayOne.removeChild(displayOne.firstChild);
            };
            while (displayTwo.firstChild) {
                displayTwo.removeChild(displayTwo.firstChild);
            };
            while (displayThree.firstChild) {
                displayThree.removeChild(displayThree.firstChild);
            };

            let count = 0
            for (item of data){
                count += 1;
                let listItem = document.createElement('li');
                // Films has a key of 'title' instead of 'name', 
                // checks for key of 'title', if exists, uses 'title' key instead of 'name' key.
                if (item.hasOwnProperty('title')) {
                    if (language === 'english'){
                        listItem.innerHTML = '<p>' + item.title + '</p>';
                        bodyWrapperImg.style.backgroundImage ='url("./Assets/chihiro036.jpeg")';
                        bodyWrapperImg.setAttribute('id', 'films-en');

                    } else if (language === 'japanese'){
                        listItem.innerHTML = `<p>${item.original_title} (${item.original_title_romanised})</p>`;
                        bodyWrapperImg.style.backgroundImage = 'url("./Assets/nausicaa009.jpeg")';
                        bodyWrapperImg.setAttribute('id', 'films-jp');
                    }
                    } else if (language === 'romanji'){
                        listItem.innerHTML = '<p>' + item.original_title_romanised +  '</p>';
                        bodyWrapperImg.style.backgroundImage = 'url("./Assets/chihiro036.jpeg")';
                        bodyWrapperImg.setAttribute('id', 'films-en');
                } else {
                    listItem.innerHTML = '<p>' + item.name + '</p>';
                    switch (language){
                        case 'people':
                            bodyWrapperImg.style.backgroundImage = 'url("./Assets/nausicaa049.jpeg")';
                            bodyWrapperImg.setAttribute('id', 'people');
                            break;
                        case 'species':
                            bodyWrapperImg.style.backgroundImage = 'url("./Assets/totoro024.jpeg")';
                            bodyWrapperImg.setAttribute('id', 'species');
                            break;
                        case 'locations':
                            bodyWrapperImg.style.backgroundImage = 'url("./Assets/chihiro011.jpeg")';
                            bodyWrapperImg.setAttribute('id', 'locations');
                            break;
                        case 'vehicles':
                            bodyWrapperImg.style.backgroundImage = 'url("./Assets/ponyo039.jpeg")';
                            bodyWrapperImg.setAttribute('id', 'vehicles');
                            break;
                    }
                }
   
                //  Based on each item's 'count' it assigns it to one of 3 columns
                if (count %3 === 0){
                    displayItems = document.querySelector('#ul-three');
                } else if (count %3 === 2){
                    displayItems = document.querySelector('#ul-two');
                } else if (count %3 === 1){
                    displayItems = document.querySelector('#ul-one');
                }
                displayItems.appendChild(listItem);  
            };

            switch(language){
                case 'english':
                    showHideDiv.setAttribute('id', 'show-translate-container');
                    break;
                case 'japanese':
                    showHideDiv.setAttribute('id', 'show-translate-container');
                    break;
                case 'romanji':
                    showHideDiv.setAttribute('id', 'show-translate-container');
                    break;
                default:
                    showHideDiv.setAttribute('id', 'hide-translate-container');
                    break;
                }
        })
        .catch((err) => {
            console.log(err);
        })
}
