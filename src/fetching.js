/* 

fetch(url: string, options: object)

*/

fetch('https://jsonplaceholder.typicode.com/users', {
    method: 'GET', // GET, POST, PUT, DELETE
    //body: '', // POST, PUT
    headers: {
        'Content-Type': 'application/json'
    }
})
then((response) => {
    console.log(response);
}) // GET 


