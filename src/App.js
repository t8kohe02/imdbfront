import React from 'react'
import axios from 'axios'
import './App.css';
import {useState, useEffect} from 'react'



export default function App() {

  const url = 'http://localhost/imdbback/'
  const [name, setName] = useState('');
  const [searchterm, setSearchterm] = useState([]);
  const [namesubmit, setNamesubmit] = useState('');
 

  
  function handleSubmit(e) {

    e.preventDefault();
    setNamesubmit(name)
   
  };

  useEffect(() =>{
    if (name !== null){
      
    
    axios.get(url + 'searchbyterm.php/' + namesubmit)
    .then((response) => {
      const json = response.data;
      setSearchterm(json);
    }).catch (error => {
      if (error.response === undefined){
        alert(error);
      } else {
        alert(error.response.data.error);
      }
    })}
  },[])
  console.log(searchterm)

  return (
    <div className="container">
      <h2>Etsi elokuvia hakusanalla</h2>
      <div>
  
                <input className="form-control me-2" type="search" placeholder="Haku" aria-label="Search" 
                onClick={e => setName(e.target.value)}/>
              <button className="btn btn-outline-success" type="submit" onClick={handleSubmit}>Etsi</button>
  
        </div>                                             
       <div>
        <ul>
        {searchterm.map(item => (
          <li>Elokuvan nimi: {item.primary_title}<br /> Genre: {item.genre}</li>       
        ))}                                                                                 
        </ul>
      </div> 
    </div>
  )} 



