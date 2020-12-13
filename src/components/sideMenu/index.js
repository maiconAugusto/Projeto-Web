import React from 'react';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserPlus, faList,
} from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';

export default function SideMenu() {
  const history = useHistory();
  return (
    <SideNav
      onSelect={(selected) => {
        history.push(selected);
      }}
    >
      <SideNav.Toggle />
      <SideNav.Nav>
        <NavItem eventKey="/">
          <NavIcon>
            <FontAwesomeIcon icon={faUserPlus} />
          </NavIcon>
          <NavText>
            Adicionar Cliente
          </NavText>
        </NavItem>
        <NavItem eventKey="/list">
          <NavIcon>
            <FontAwesomeIcon icon={faList} />
          </NavIcon>
          <NavText>
            Listar Clientes
          </NavText>
        </NavItem>
      </SideNav.Nav>
    </SideNav>
  );
}
