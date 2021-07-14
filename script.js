// URL variables
const baseUrl = 'https://ghibliapi.herokuapp.com/';
const filmsUrl = `${baseUrl}films`;
const peopleUrl = `${baseUrl}people`;
const speciesUrl = `${baseUrl}species`;
const locationsUrl = `${baseUrl}locations`;
const vehiclesUrl = `${baseUrl}vehicles`;

let myUrl;

function chooseInput(mybutton){
    console.log(mybutton.id);

    switch (mybutton.id) {
        case 'films':
            console.log(1);
            getFetch(filmsUrl);
            break;
        case 'people':
            console.log(2);
            getFetch(peopleUrl);
            break;
        case 'species':
            console.log(3);
            getFetch(speciesUrl);
            break;
        case 'locations':
            console.log(4);
            getFetch(locationsUrl);
            break;
        case 'vehicles':
            console.log(5);
            getFetch(vehiclesUrl);
            break;
        default:
            break;
    }
}


async function getFetch(myParameter){
    console.log(`myParameter: ${myParameter}`);
   
    await fetch(myParameter)
        .then(function(response){
            return response.json();
        })

        .then((data) => {
            //work with json data here
            console.log(`type: `,typeof data);
            console.log(data.length);
            console.log(data);
        })
        .catch((err) => {
            console.log(err);
        })
}

