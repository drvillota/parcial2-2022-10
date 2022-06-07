import React, { useContext, useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap"
import './PokemonList.scss';
import { FormattedNumber } from "react-intl";
import { FormattedMessage } from "react-intl";
import BarChart from "./../../components/bar-chart";
import { PokemonsContext } from "../../context/PokemonsContext";
import { LocaleContext } from "../../context/LocaleContext";
import { Button } from "bootstrap";

export var fetchPokemons = null

export const PokemonList = () => {
  //URLs data
  const urlES =
    "https://gist.githubusercontent.com/jhonatan89/e379fadf8ed0f5381a2d8f8f3dea90c3/raw/f8357c439bbb7b4bd3dc6e8807c52105fb137ec6/pokemon-es.json";
  const urlEN =
    "https://gist.githubusercontent.com/jhonatan89/2089276d3ce0faceff8e55fc3459b818/raw/30ee1a77b3e328108faaaa9aaac6f2ddaa3d3711/pokemons-en.json";
  
  const [pokemons, setPokemons] = useState([]);
  const [locale, setLocale] = useContext(LocaleContext);
  const [pokemonsList, setPokemonsList] = useContext(PokemonsContext);
  //Get data
  useEffect(() => {
    if (!navigator.onLine) {
      if (JSON.parse(localStorage.getItem("pokemons")) === null) {
        setPokemons("nada :c");
        setPokemonsList("nada :c")
      } else {
        setPokemons(JSON.parse(localStorage.getItem("pokemons")));
        setPokemonsList(JSON.parse(localStorage.getItem("pokemons")));
      }
    } else {
      fetchPokemons();
    }
  }, []);

  fetchPokemons = async () => {
    const respES = await fetch(urlES);
    const datpES = await respES.json();
    const respEN = await fetch(urlEN);
    const datpEN = await respEN.json();
    var pokemons = null;
    if(locale.includes("en")){
      pokemons = datpEN?.map((resp) => {
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
    }
    else{
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
    }
    setPokemons(pokemons);
    setPokemonsList(pokemons);
    localStorage.setItem("pokemons", JSON.stringify(pokemons));
  };

  return (
    <>
      <Container className='pokemon-container'>
        <h1><FormattedMessage id="Tittle"/></h1>
        <Table className='table'>
          <thead className="thead-dark">
            <tr>
              <th scope='col'>#</th>
              <th scope='col'><FormattedMessage id="Image"/></th>
              <th scope='col'><FormattedMessage id="Name"/></th>
              <th scope='col'><FormattedMessage id="Description"/></th>
              <th scope='col'><FormattedMessage id="Height"/></th>
              <th scope='col'><FormattedMessage id="Weight"/></th>
              <th scope='col'><FormattedMessage id="Type"/></th>
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
              <td>
                <p className="type">{elm.type[0]}</p>
                <p className="type">{elm.type[1]}</p>
              </td>
            </tr>
          ))}  
          </tbody>
        </Table>
        <div>
          <BarChart data={pokemons}/>
        </div>
      </Container>
    </>
  );
};

//Get current browser language
function getLanguage(pLocale) {
  if (pLocale.includes("en")) {
    return true;
  } else if (pLocale.includes("es")) {
    return false;
  }
}

export default PokemonList;
