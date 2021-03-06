import React, { useState, useEffect } from 'react'

import { NavbarBrand, Navbar, NavItem, NavLink, Nav } from 'reactstrap'
import { Drawer, Icon, IconButton } from 'rsuite'

import SearchSummonerForm from '../searchSummonerForm'

import Logo from '../../assets/league_logo.svg'
import './Navbar.css'

const BaseNavbar = (props) => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const language = props.match.params.lang || 'en'
  const [hover, setHover] = useState(false)

  return (
    <>
      <header>
        <Navbar
          dark
          expand="lg"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className={
            'app-navbar app-navbar-color ' +
            (props.page === 'home' ? (hover ? '' : 'not-hovered') : '')
          }
        >
          <div className="nav-container">
            <NavbarBrand href="/">
              <img src={Logo} alt="logo" />
            </NavbarBrand>
            <Nav className="mr-auto" navbar>
              <NavItem className="mobile-content-center">ICON</NavItem>
              <NavItem className="nav-content-link">
                <NavLink
                  className={props.page === 'champions' ? 'active' : ''}
                  href={`/${language}/${props.match.params.region}/champions`}
                >
                  Champions
                </NavLink>
              </NavItem>
              <NavItem className="nav-content-link">
                <NavLink
                  className={props.page === 'leaderboard' ? 'active' : ''}
                  href={`/${language}/${props.match.params.region}/leaderboard`}
                >
                  Leaderboard
                </NavLink>
              </NavItem>
              <NavItem className="nav-content-link">
                <NavLink
                  className={props.page === 'statistics' ? 'active' : ''}
                  href={`/${language}/${props.match.params.region}/statistics`}
                >
                  Statistics
                </NavLink>
              </NavItem>
              <NavItem className="nav-content-link">
                <NavLink
                  className={props.page === 'items' ? 'active' : ''}
                  href={`/${language}/${props.match.params.region}/items`}
                >
                  Items
                </NavLink>
              </NavItem>
            </Nav>
            <div className="nav-content-link">
              {!props.noSearch && <SearchSummonerForm {...props} />}
            </div>
            <div className="drawer-button">
              <IconButton
                circle
                icon={<Icon icon="bars" />}
                onClick={() => setDrawerOpen(true)}
              />
            </div>
          </div>
        </Navbar>
        <Drawer
          size="xs"
          placement="right"
          show={drawerOpen}
          className="navbar-drawer"
          enforceFocus={true}
          keyboard={true}
          onHide={() => setDrawerOpen(false)}
        >
          <Drawer.Header>
            <Drawer.Title>App Name</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body className="drawer-link-list">
            <a href={`/${language}/${props.match.params.region}`}>Home</a>
            <a href={`/${language}/${props.match.params.region}/champions`}>
              Champions
            </a>
            <a href={`/${language}/${props.match.params.region}/leaderboard`}>
              Leaderboard
            </a>
            <a href={`/${language}/${props.match.params.region}/statistics`}>
              Statistics
            </a>
            <a href={`/${language}/${props.match.params.region}/items`}>
              Items
            </a>
            {!props.noSearch && (
              <SearchSummonerForm {...props} isDrawer={true} />
            )}
          </Drawer.Body>
        </Drawer>
      </header>
    </>
  )
}

export default BaseNavbar
