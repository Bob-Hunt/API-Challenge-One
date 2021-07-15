// URL variables
const baseUrl = 'https://ghibliapi.herokuapp.com/';
const filmsUrl = `${baseUrl}films`;
const peopleUrl = `${baseUrl}people`;
const speciesUrl = `${baseUrl}species`;
const locationsUrl = `${baseUrl}locations`;
const vehiclesUrl = `${baseUrl}vehicles`;

let myUrl;
let english = true;

let displayItems;
let displayOne = document.getElementById('ul-one');
let displayTwo = document.getElementById('ul-two');
let displayThree = document.getElementById('ul-three');


// accepts event from 5 different HTML buttons and calls getFetch()
// with different parameters based on which button is clicked.
function chooseInput(mybutton){
    console.log(mybutton.id);

    switch (mybutton.id) {
        case 'films':
            getFetch(filmsUrl);
            break;
        case 'people':
            getFetch(peopleUrl);
            break;
        case 'species':
            getFetch(speciesUrl);
            break;
        case 'locations':
            getFetch(locationsUrl);
            break;
        case 'vehicles':
            getFetch(vehiclesUrl);
            break;
        default:
            break;
    }
}

function translate() {
    console.log("Konnichiwa!");
};
    // async function(filmId){
    //     let filmId = filmId;
    //     await fetch(filmsUrl)
    //         .then((response) => response.json)
    //         .then(function(films) {
    //             for (film of films){
    //                 if (filmId === film.id){
    //                     let translateItem = document.getElementById(filmId);
    //                     translateItem.innerHtml = '<p>' + item.original_title +'....' + '<button class="english">Translate</button>' + '</p>';
                   
    //                 }
    //             }

    //         })
    // }
// }


// getFetch function //
async function getFetch(myParameter){
    console.log(`myParameter: ${myParameter}`);
   
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
                // checks for key of 'title', if exists, returns 'title' instead of 'name'.
                console.log(count);
                if (item.hasOwnProperty('title')) {
                    listItem.innerHTML = '<p>' + item.title + '</p>';
                } else {
                    listItem.innerHTML = '<p>' + item.name + '</p>';
                }
            
                if (count %3 === 0){
                    displayItems = document.querySelector('#ul-three');
                } else if (count %3 === 2){
                    displayItems = document.querySelector('#ul-two');
                } else if (count %3 === 1){
                    displayItems = document.querySelector('#ul-one');
                }

                displayItems.appendChild(listItem);  

            }
        
        })
        .catch((err) => {
            console.log(err);
        })
}

// Possibly, dynamically create a Translate button that translates all film
// titles when pressed (clears element and reprints english AND Japanese)