/* eslint-disable linebreak-style */
/* eslint-disable import/order */
import React from 'react';
import Logo from '../../assests/img/Logo.png';
import './Menu.css';
import Button from '../Button';
import { Link } from 'react-router-dom';

function Menu() {
  return (
    <nav className="Menu">
      <Link to="/">
        <img className="Logo" src={Logo} alt="AnderFlix-Logo" />
      </Link>
      <Button as={Link} className="ButtonLink" to="/cadastro/video">
        Novo Video
      </Button>
    </nav>

  );
}
export default Menu;
