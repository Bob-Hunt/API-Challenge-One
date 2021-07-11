const baseUrl = 'https://ghibliapi.herokuapp.com/';
const films = `${baseUrl}films`;
const people = `${baseUrl}people`;
const species = `${baseUrl}species`;
const locations = `${baseUrl}locations`;
const vehicles = `${baseUrl}vehicles`;

let listDisplay = document.getElementById('ul-display');

async function getGibli() {
    try {
        await fetch(vehicles)
            .then(function(response){
                console.log(`response type is: ${typeof response}`);
                response.text();
                console.log(`now response is: ${typeof response}`);
                console.log(response.length);

            .then(function(res){
                let myList = res;
                console.log(myList.length);
                // console.log(res);
                // console.log(typeof myList);
                // for (item of myList){
                //     console.log(`item: ${item}`);
                    // let listItem = document.createElement('li');
                    // listItem.innerHTML = '<p>' + item.name + '</p>';
                    // listDisplay.appendChild(listItem);
                }
            );
        })

    } catch (error) {
        console.log(error);
    }

}

getGibli();

// let GhibliList = document.querySelector('ul');

// fetch()
//     .then(function(response){
//         return response.json();
//         // console.log(response)
//     })
//     .then(function(json){
//         // console.log(json.results);
//         let listResults = json.results
//         for (item of list){
//             let listItem = document.createElement('li');
//             listItem.innerHTML = '<p>' + person.name + '</p>';
//             starWarsPeopleList.appendChild(listItem);
//         }
//     });
