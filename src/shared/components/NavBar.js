import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap"
import { LocaleContext } from "../../context/LocaleContext";
import './NavBar.scss';
import {PokemonList,fetchPokemons } from '../../pages/pokemon-list/PokemonList';

export const NavBar = (props) => {
  const [locale, setLocale] = useContext(LocaleContext);

  
  function changeLocale(l) {
    setLocale(l);
    fetchPokemons();
  }

  return (
    <Navbar className='navbar navbar-expand-lg navbar-light bg-light'>
      <Container className='container-fluid'>
        <Navbar.Brand className='navbar-brand' href='#main'>
          <FormattedMessage id='test' />
        </Navbar.Brand>
        <Navbar.Toggle
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarNav'
          aria-controls='basic-navbar-nav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </Navbar.Toggle>
        <Navbar.Collapse className='collapse navbar-collapse' id='navbarNav'>
          <Nav className='navbar-nav'>
            <li className='nav-item active'>
              <Link className='nav-link' to='/'>
                <FormattedMessage id='pokemons' />
              </Link>
            </li>
            <NavDropdown title={<FormattedMessage id="Language"/>} id="basic-nav-dropdown">
              <NavDropdown.Item href="#" onClick={() => changeLocale('en-us')}><FormattedMessage id="English"/></NavDropdown.Item>
              <NavDropdown.Item href="#"  onClick={() => changeLocale('es-co')}><FormattedMessage id="Spanish"/></NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
