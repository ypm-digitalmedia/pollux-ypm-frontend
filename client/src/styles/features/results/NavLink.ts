import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

import theme from '../../theme'

const StyledNavLink = styled(NavLink)`
  color: ${theme.color.black};
  // background-color: ${theme.color.tabButtonBgColor};
  background-color: ${theme.color.lightGray};
  letter-spacing: 0;
  text-align: center;
  display: block;
  padding: 12px 18px;
  text-decoration: none;
  border-radius: 0px;
  width: 100%;
  align-items: start;
  flex-direction: column;
  margin-bottom: 10px;

  & > div > div > img {
    filter: grayscale(100%);
  }

  & > div > div > div > div.linkTitle {
    font-size: ${theme.font.desktop.tabNavigation.size};
    font-weight: ${theme.font.desktop.tabNavigation.weight};
    line-height: ${theme.font.desktop.tabNavigation.lineHeight};
  }

  & > div > div > div > div.linkSubtext {
    font-size: ${theme.font.desktop.bodyLight.size};
    font-weight: ${theme.font.desktop.bodyLight.weight} !important;
    line-height: ${theme.font.desktop.bodyLight.lineHeight};
  }

   &:hover > div > div > div > div.linkSubtext > span.mobile-nav-results-label {
    color: ${theme.color.black}!important;
    font-size: 3em!important;
  }

  &:hover {
    color: ${theme.color.black};
    text-decoration: underline;
    background-color: ${theme.color.tabButtonBgColor};
    };
  }

  &.active {
    box-shadow:
      -4px 0px 8px -6px ${theme.color.black20},
      4px 0px 8px -6px ${theme.color.black20},
     0px -2px 8px -6px ${theme.color.black20};
    background: white!important;
    border-bottom-right-radius: 0px;
    border-bottom-left-radius: 0px;
    margin-bottom: 0px;
    z-index: 2;

    &:before {
      left: -14px;
      border-bottom-right-radius: 0px!important;
      // box-shadow: 7px 7px 0 7px ${theme.color.white};
    }

    &:after {
      right: -14px;
      border-bottom-left-radius: 0px!important;
      // box-shadow: -7px 7px 0 7px ${theme.color.white};
    }

    & > div > div > img {
      filter: none;
    }

    &#objects {
      // box-shadow:
      //   -8px 0px 8px -6px ${theme.color.black20},
      //   5px 0px 8px -6px ${theme.color.black20},
      //   0px -5px 8px -6px ${theme.color.black20};

      &:after {
        content: '';
        position: absolute;
        bottom: -1px;
        width: 14px;
        height: 14px;
        background: transparent;
        pointer-events: none;
      }
    }

    &#events {
      box-shadow: 0px -2px 5px ${theme.color.black20};

      &:before {
        content: '';
        position: absolute;
        bottom: -1px;
        width: 14px;
        height: 14px;
        background: transparent;
        pointer-events: none;
      }
    }

    &#works,
    &#collections,
    &#people,
    &#places,
    &#concepts {
      &:before,
      &:after {
        content: '';
        position: absolute;
        bottom: -1px;
        width: 14px;
        height: 14px;
        background: transparent;
        pointer-events: none;
      }
    }
  }

  @media (min-width: 1469px) {
    font-size: 1.25em;
  }

  &.myCollectionsNavLink {
    color: ${theme.color.trueBlack};
    font-size: 1.25rem;

    &.nav-link.active {
      color: ${theme.color.primary.blue};
      border-bottom-color: ${theme.color.primary.blue};
    }

    &.nav-link:not(.active) > div > div > span.badge {
      background-color: ${theme.color.gray};
    }
  }
`

export default StyledNavLink
