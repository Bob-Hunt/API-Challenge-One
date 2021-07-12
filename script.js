const baseUrl = 'https://ghibliapi.herokuapp.com/';
const films = `${baseUrl}films`;
const people = `${baseUrl}people`;
const species = `${baseUrl}species`;
const locations = `${baseUrl}locations`;
const vehicles = `${baseUrl}vehicles`;

let listDisplay = document.getElementById('ul-display');

async function getGibli() {
    await fetch(films)
        .then(function(response){
            // console.log(`response type is: ${typeof response}`);
            // console.log(`now response is: ${typeof response}`);
            // console.log(response.length);
            return response.json()
        })

        .then((data) => {
            //work with json data here
            console.log(data)
        })
        .catch((err) => {
            console.log(err)
        })
}

getGibli();

