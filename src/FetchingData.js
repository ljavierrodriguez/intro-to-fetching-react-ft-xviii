import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function FetchingData() {

  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [pokemons, setPokemons] = useState(null);

  useEffect(() => {

    console.log('Componente Cargado');

    getUsers();

    getPosts();

    getPokemons();

  }, [])


  /* const getUsers = () => {
    fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'GET', // GET, POST, PUT, DELETE
      //body: '', // POST, PUT
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        console.log(response);
        console.log(response.status);
        console.log(response.headers.get('content-type'))

        return response.json()
      })
      .then((data_json) => {
        console.log(data_json);
        setUsers(data_json)

        return data_json;
      })
      .then(data => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      })
  } */

  const getUsers = async () => { // await 
    try {
      
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      setUsers(data);

    } catch (error) {
      console.log(error)
    }
  }

  const getPosts = () => {
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'GET', // GET, POST, PUT, DELETE
      //body: '', // POST, PUT
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        console.log(response);
        console.log(response.status);
        console.log(response.headers.get('content-type'))

        return response.json()
      })
      .then((data_json) => {
        console.log(data_json);
        setPosts(data_json)

        return data_json;
      })
      .then(data => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const getPokemons = async () => {
    try {

      const response = await fetch('https://pokeapi.co/api/v2/pokemon')
      const data = await response.json()
      //console.log(data)
      const { results } = data; // destructuring results from data
      
      results.forEach(async (poke, index) => {
        const respPoke = await fetch(poke.url);
        const dataPoke = await respPoke.json();
        //console.log(dataPoke);
        results[index].info = dataPoke;
      });
      data.results = results;
      setPokemons(data);

    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="container bg-info">
      <div className="row">
        <div className="col-md-12">

          <h1>Listado de Usuarios</h1>
          <ul className="list-group mb-3">
            {
              users.length > 0 ?
                users.map((user) => {
                  return (
                    <li className="list-group-item" key={user.id}>
                      {user.name}
                    </li>
                  )
                })
                :
                <li className="list-group-item">
                  Listado vacio
                </li>
            }
          </ul>
          <button className="btn btn-info" onClick={getUsers}>Load Data</button>

          <ul className="list-group mb-3">
            {
              !!pokemons &&
              pokemons.results.length > 0 ?
              pokemons.results.map((pokemon) => {
                  return (
                    <li className="list-group-item" key={pokemon?.name}>
                      {pokemon?.name} <span className='badge bg-success'>{pokemon?.info?.base_experience}</span>
                    </li>
                  )
                })
                :
                <li className="list-group-item">
                  Listado vacio
                </li>
            }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default FetchingData;
