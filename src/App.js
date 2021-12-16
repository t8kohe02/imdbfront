import React from 'react'
import axios from 'axios'
import './App.css';
import {useState, UseEffect} from 'react'
import uuid from 'uuid/package.json'


export default function App() {

  const url = 'http://localhost/imdbback/'
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const search = e => {
    e.preventDefault();
    if(searchTerm === ''){
      return;
    }else{
      axios.get(url + '/searchbyterm.php?search=' + searchTerm
      ).then((response) => {
        const json = response.data;
        console.log(json);
        setResults(json);
      }). catch(e => console.log(e))
    }
  }
return (
  <div className="container">
    <h2>Etsi elokuvia hakusanalla</h2>
    <label className="myForm label-text">Syötä hakusana :</label>
    <input className="myForm" onChange={(e => {setSearchTerm(e.target.value)})}
    name="search" placeholder="genre,nimi..."/>
    <button className="myForm" onClick={search}>Etsi</button>
    <div>
      <ul>
        {results.map(item => (
          <li key={uuid()}>Nimi: {item.primary_title}<br /> Genre: {item.genre}</li>
        ))}
      </ul>
    </div>
    <div>
      <h2>Montaako tyylilajia elokuvista löytyy ?</h2>
      <button className="myForm" onClick={}>Etsi</button>
    </div>
  </div>

)
}


