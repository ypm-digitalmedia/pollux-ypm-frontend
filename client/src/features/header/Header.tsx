import React, { useState } from 'react'
import { Container, Nav, NavDropdown, Navbar, Row, Col } from 'react-bootstrap'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

import config from '../../config/config'
import LogoWhiteOne from '../../resources/images/logo/ypm-mallory-white-1.svg'
import LogoBlueTwo from '../../resources/images/logo/ypm-mallory-yaleblue-2.svg'
import StyledHeader from '../../styles/features/header/Header'
import theme from '../../styles/theme'
import SearchContainer from '../search/SearchContainer'
import { pushClientEvent } from '../../lib/pushClientEvent'

import SearchButton from './SearchButton'

const headerTransitionDuration = '200ms'

const SeparatingLine = styled.div`
  border-left-width: 1px;
  border-left-style: solid;
  border-color: white;
  margin-right: 10px;
  margin-left: 10px;
`

const HeaderExpander = styled.div<{ $displaySearch: boolean }>`
  height: ${(props) => (props.$displaySearch ? 'auto' : '0px')};
  opacity: ${(props) => (props.$displaySearch ? '100%' : '0%')};
  transition-property: height;
  transition-duration: ${headerTransitionDuration};
  transition-timing-function: ease-in-out;
  width: 100%;
  background-color: ${theme.color.primary.darkBlue};
  display: ${(props) => (props.$displaySearch ? 'block' : 'none')};

  margin: 0;
  padding-right: 1rem;
  padding-left: 1rem;
`

const StyledSpan = styled.span`
  justify-content: start;
  width: 100%;

  @media (min-width: ${theme.breakpoints.md}px) and (max-width: ${theme
      .breakpoints.lg}px) {
    justify-content: space-between;
  }

  @media (min-width: ${theme.breakpoints.lg}px) {
    width: auto;
  }
`

const Header: React.FC<{ hideSearch?: boolean }> = ({ hideSearch }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const displaySearch = isSearchOpen && !hideSearch

  const handlePushClientEvent = (link: string): void => {
    pushClientEvent('Internal Link', 'Selected', `Internal ${link}`)
  }

  return (
    <StyledHeader>
      <Container fluid className="mx-0 main-header-container px-0">
        <Row className="mx-0 px-0">
          <Col lg={2} md={3} sm={12} className={'logo-container-left'}>
            <NavLink
              to="/"
              className="navbar-brand titleHeading float-right"
              onClick={() => handlePushClientEvent('Landing Page')}>
              <img
                src={LogoBlueTwo}
                className="logo-left mt-2"
                alt="Yale Peabody Museum"
              />
            </NavLink>
          </Col>
          <Col lg={10} md={9} sm={0} className="main-nav px-0">
            <Navbar
              collapseOnSelect
              expand="lg"
              bg="dark"
              variant="dark"
              className="w-auto px-4 py-3"
            >
              <Container fluid className="mx-0 px-0 navbarContainer">
                <StyledSpan>
                  <img
                    src={LogoWhiteOne}
                    className="logo-top mt-2 ps-0"
                    alt="Yale Peabody Museum"
                  />
                </StyledSpan>
                <StyledSpan className="d-flex">
                  <NavLink
                    to="/"
                    className="navbar-brand titleHeading float-right"
                    onClick={() => handlePushClientEvent('Landing Page')}
                  >
                    Collections Discovery
                  </NavLink>
                  <Navbar.Toggle
                    aria-controls="responsive-navbar-nav"
                    className="show-menu float-left"
                  />
                </StyledSpan>
                <Navbar.Collapse
                  id="responsive-navbar-nav"
                  className="justify-content-end"
                >
                  <Nav id="nav-links">
                    {/* <NavLink
                      to="/content/about-lux"
                      className="nav-link"
                      onClick={() => handlePushClientEvent('About LUX')}
                    >
                      About LUX
                    </NavLink> */}
                    <NavLink
                      to="/content/open-access"
                      className="nav-link"
                      onClick={() => handlePushClientEvent('Open Access')}
                    >
                      Open Access
                    </NavLink>
                    <NavLink
                      to="/content/simple-search"
                      className="nav-link"
                      onClick={() => handlePushClientEvent('Search Tips')}
                    >
                      Search Tips
                    </NavLink>
                    <NavLink
                      to="/content/faq"
                      className="nav-link"
                      onClick={() => handlePushClientEvent('Help')}
                    >
                      Help
                    </NavLink>
                    {hideSearch ? null : (
                      <React.Fragment>
                        <SeparatingLine />
                        <SearchButton
                          displaySearch={displaySearch}
                          setIsSearchOpen={setIsSearchOpen}
                        />
                      </React.Fragment>
                    )}
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
            {/* <div className="powered-by-lux mt-2">
              <a href="/content/about-lux">
                <span className="lux-powered-by">Powered by </span>
                <span className="lux-name">LUX</span>&nbsp;
                <i className="bi bi-question-circle"></i>
              </a>
            </div> */}
            <HeaderExpander $displaySearch={displaySearch}>
              <SearchContainer
                className="headerSearchContainer"
                isBelowFold={true}
                bgColor={theme.color.primary.darkBlue}
                id="header-search-container"
                searchTipsStyle={{
                  color: theme.color.white,
                  textDecoration: 'underline',
                }}
              />
            </HeaderExpander>
          </Col>
        </Row>
      </Container>
    </StyledHeader>
  )
}

export default Header
