import React from 'react'
import axios from 'axios'
import './App.css';
import {useState, useEffect} from 'react'



export default function App() {

  const url = 'http://localhost/imdbback/'
  const [name, setName] = useState('');
  const [searchterm, setSearchterm] = useState([]);
  const [viewResults, setViewresults] = useState([]);
  const [rating, setRating] = useState(0);
  const [procedures, setProcedures] = useState([]);
 

  
  function handleSubmit(e) {                            //Termihakufunktio

    e.preventDefault();    
    axios.get(url + 'searchbyterm.php/' + name)
    .then((response) => {
      const json = response.data;
      setSearchterm(json);
    }).catch (error => {
      if (error.response === undefined){
        alert(error);
      } else {
        alert(error.response.data.error);
      }
    })
  }
  function showFi(e){                                   //suomalaisten elokuvien haku viewistä
    e.preventDefault();
    axios.get(url + 'finnish.php')
    .then((response) => {
      const json = response.data;
      setViewresults(json);
    }).catch (error => {
      if (error.response === undefined){
        alert(error);
      } else {
        alert(error.response.data.error);
      }
    })
  }
  function showSe(e){                                    //ruotsalaisten elokuvien haku viewistä
    e.preventDefault();
    axios.get(url + 'swedish.php')
    .then((response) => {
      const json = response.data;
      setViewresults(json);
    }).catch (error => {
      if (error.response === undefined){
        alert(error);
      } else {
        alert(error.response.data.error);
      }
    })
  }
  function showGb(e){                                    //englantilaisten elokuvien haku viewistä
    e.preventDefault();
    axios.get(url + 'english.php')
    .then((response) => {
      const json = response.data;
      setViewresults(json);
    }).catch (error => {
      if (error.response === undefined){
        alert(error);
      } else {
        alert(error.response.data.error);
      }
    })
  }
  function titlesByRating(e){                             //haku minimiarvostelupisteiden avulla
    e.preventDefault();
    axios.get(url + 'rating.php?value=' + rating
    ).then((response) => {
      const json = response.data;
      setProcedures(json);
    }).catch (error => {
      if (error.response === undefined){
        alert(error);
      } else {
        alert(error.response.data.error);
      }
    })

  }

  console.log(searchterm)

  return (
    <div className="container">
      <h1>IMDB HARJOITUS</h1>
      <div>
      <h2>Etsi elokuvia hakusanalla</h2>
        <form onSubmit={handleSubmit}>
        <input className="form-control me-2" type="search" placeholder="Haku" aria-label="Search" 
        onChange={e => setName(e.target.value)}/>
        <button  type="submit" >Etsi</button>
        </form>
        <h2>Etsi elokuvia vieweistä !</h2>
        <button onClick={showFi}>Suomalaisia!</button>
        <button onClick={showSe}>Ruotsalaisia!</button>
        <button onClick={showGb}>Englantilaisia!</button>
        </div>
        <div>
        <h2>Määrittele vähimmäis arvio (1=huono ja 9=erinomainen) ja hae elokuvia proseduurin avulla! </h2>
        <select onClick={e => setRating(e.target.value)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
        </select>
        <button className="funbutton" onClick={titlesByRating}>10 elokuvaa vähintään {rating} keskiarvolla !</button>
      </div>                                             
       <div>
        <ul>
        {searchterm.map(item => (
          <li>Elokuvan nimi: {item.primary_title}<br /> Genre: {item.genre}</li>   //Termihaun mappaus    
        ))}                                                                                 
        </ul>
        <ul>
          {viewResults.map(item => (
            <li>Elokuvan nimi: {item.title}<br /> Genre: {item.genre}</li>       //Viewien mappaus
          ))}
        </ul>
        <ul>
          {procedures.map(item => (
            <li>Elokuvan nimi: {item.title}<br /> Arvosana {item.average_rating}/10</li>  //Proseduurin mappaus
          ))}
        </ul>

      </div>
      
       
    </div>
  )} 
