import React, { useState, useEffect } from "react";
import './PokemonList.scss';
import { FormattedNumber } from "react-intl";
import { FormattedMessage } from "react-intl";

export const PokemonList = () => {
  //URLs data
  const urlES =
    "https://gist.githubusercontent.com/jhonatan89/e379fadf8ed0f5381a2d8f8f3dea90c3/raw";
  const urlEN =
    "";
  const [pokemons, setPokemons] = useState([]);

  //Get data
  useEffect(() => {
    fetchPokemons();
  }, []);

  useEffect(() => {
    if (!navigator.onLine) {
      if (JSON.parse(localStorage.getItem("pokemons")) === null) {
        console.log("nada :c");
      } else {
        setPokemons(JSON.parse(localStorage.getItem("pokemons")));
      }
    } else {
      fetchPokemons();
    }
  }, []);

  const fetchPokemons = async () => {
    const respES = await fetch(urlES);
    const datpES = await respES.json();
    //console.log(dataES);
    var pokemons = null;
    pokemons = datpES?.map((resp) => {
        
        return {
          id: resp.id,
          thumbnailImage: resp.ThumbnailImage,
          name: resp.name,
          description: resp.description,
          height: resp.height,
          weight: resp.weight,
          type: resp.type,
        };
      });
    
   
    setPokemons(pokemons);
    localStorage.setItem("pokemons", JSON.stringify(pokemons));
  };

  return (
    <>
      <div className='pokemon-container'>
        <h1>Most wanted pokemons</h1>
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'><FormattedMessage id="Image"/></th>
              <th scope='col'>Name</th>
              <th scope='col'>Description</th>
              <th scope='col'>Height</th>
              <th scope='col'>Weight</th>
              <th scope='col'>Type</th>
            </tr>
          </thead>
          <tbody>
          {pokemons.map((elm, index) => (
            <tr>
              <th scope='row'>{elm.id}</th>
              <td><img src={elm.thumbnailImage} className='img' alt={elm.name}/></td>
              <td>{elm.name}</td>
              <td>{elm.description}</td>
              <td><FormattedNumber value={elm.height}/></td>
              <td><FormattedNumber value={elm.weight}/></td>
              <td>{elm.type}</td>
            </tr>
          ))}  
          </tbody>
        </table>
      </div>
    </>
  );
};

//Get current browser language
function getLanguage() {
  if (navigator.language.includes("en")) {
    return true;
  } else if (navigator.language.includes("es")) {
    return false;
  }
}

export default PokemonList;
