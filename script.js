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
let displayOne = document.getElementById('ul-one');
let displayTwo = document.getElementById('ul-two');
let displayThree = document.getElementById('ul-three');

// Multiple Background Images: Change On Button Click        //
// From:  http://css3.bradshawenterprises.com/cfimg/#cfimg7  //
$(document).ready(function() {
    $("#cf7_controls").on('click', 'span', function() {
      $("#cf7 img").removeClass("opaque");
  
      var newImage = $(this).index();
  
      $("#cf7 img").eq(newImage).addClass("opaque");
  
      $("#cf7_controls span").removeClass("selected");
      $(this).addClass("selected");
    });
  });
  

// accepts event from 5 different HTML buttons and calls getFetch()
// with different parameters based on which button is clicked.
function chooseInput(mybutton, language){
    console.log(mybutton.id);

    switch (mybutton.id) {
        case 'films':
            getFetch(filmsUrl, 'english');
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

function titleTranslate(transBtn){
    console.log(transBtn.id);

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


// getFetch function //
async function getFetch(myParameter, language){
    console.log(`myParameter: ${myParameter}`);
    console.log(`language: ${language}`);
   
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
                    if (language === 'english'){
                        listItem.innerHTML = '<p>' + item.title + '</p>';
                    } else if (language === 'japanese'){
                        listItem.innerHTML = `<p>${item.original_title} (${item.original_title_romanised})</p>`;
                    }
                    } else if (language === 'romanji'){
                        listItem.innerHTML = '<p>' + item.original_title_romanised +  '</p>';
                
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

            // showHideDiv = document.querySelector('.translate-container');
            // console.log(showHideDiv.id);
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
                // console.log(showHideDiv.id);
        
        })
        .catch((err) => {
            console.log(err);
        })
}

// Possibly, dynamically create a Translate button that translates all film
// titles when pressed (clears element and reprints english AND Japanese)