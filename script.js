// URL variables
const baseUrl = 'https://ghibliapi.herokuapp.com/';
const filmsUrl = `${baseUrl}films`;
const peopleUrl = `${baseUrl}people`;
const speciesUrl = `${baseUrl}species`;
const locationsUrl = `${baseUrl}locations`;
const vehiclesUrl = `${baseUrl}vehicles`;

let myUrl;
let english = true;

let displayItems = document.querySelector('.ul-display');

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

            // Removes results from previous button before adding results from current button.
            while (displayItems.firstChild) {
                displayItems.removeChild(displayItems.firstChild);
              };
            
            for (item of data){
                let listItem = document.createElement('li');
                // Films has a key of 'title' instead of 'name', 
                // checks for key of 'title', if exists, returns 'title' instead of 'name'.
                if (item.hasOwnProperty('title')) {
                    listItem.innerHTML = '<p>' + item.title + '</p>';
                    // document.createElement('<button class="true" id="item.id" onclick="translate(button.id)">Japanese</button>');
                } else {
                    listItem.innerHTML = '<p>' + item.name + '</p>';
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