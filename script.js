const baseUrl = 'https://ghibliapi.herokuapp.com'

async function myGhibli(){
    await fetch(baseUrl)
        .then(response => response.json())
        .then(json => console.log(json))

}

myGhibli();