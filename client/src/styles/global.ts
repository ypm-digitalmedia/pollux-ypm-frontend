import { createGlobalStyle } from 'styled-components'

import YaleNewRoman from '../resources/fonts/YaleNew-Roman.otf'
import MalloryBlack from '../resources/fonts/Mallory-Black.otf'
import MalloryBold from '../resources/fonts/Mallory-Bold.otf'
import MalloryBook from '../resources/fonts/Mallory-Book.otf'
import MalloryExtraLight from '../resources/fonts/Mallory-ExtraLight.otf'
import MalloryLight from '../resources/fonts/Mallory-Light.otf'
import MalloryMedium from '../resources/fonts/Mallory-Medium.otf'
import MalloryThin from '../resources/fonts/Mallory-Thin.otf'
import MalloryUltra from '../resources/fonts/Mallory-Ultra.otf'
import MalloryMpBlack from '../resources/fonts/MalloryMP-Black.otf'
import MalloryMpBold from '../resources/fonts/MalloryMP-Bold.otf'
import MalloryMpBook from '../resources/fonts/MalloryMP-Book.otf'
import MalloryMpLight from '../resources/fonts/MalloryMP-Light.otf'
import MalloryMpMedium from '../resources/fonts/MalloryMP-Medium.otf'

import 'bootstrap-icons/font/bootstrap-icons.css'

import theme from './theme'

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'YaleNew', serif;
    src: url(${YaleNewRoman});
  }

  @font-face {
    font-family: 'Mallory Black';
    src: url(${MalloryBlack})
  }

  @font-face {
    font-family: 'Mallory Bold';
    src: url(${MalloryBold})
  }

  @font-face {
    font-family: 'Mallory Book';
    src: url(${MalloryBook})
  }

  @font-face {
    font-family: 'Mallory Extra Light';
    src: url(${MalloryExtraLight})
  }

  @font-face {
    font-family: 'Mallory Light';
    src: url(${MalloryLight})
  }

  @font-face {
    font-family: 'Mallory Medium';
    src: url(${MalloryMedium})
  }

  @font-face {
    font-family: 'Mallory Thin';
    src: url(${MalloryThin})
  }

  @font-face {
    font-family: 'Mallory Ultra';
    src: url(${MalloryUltra})
  }

  @font-face {
    font-family: 'Mallory MP Black';
    src: url(${MalloryMpBlack})
  }

  @font-face {
    font-family: 'Mallory MP Bold';
    src: url(${MalloryMpBold})
  }

  @font-face {
    font-family: 'Mallory MP Book';
    src: url(${MalloryMpBook})
  }

  @font-face {
    font-family: 'Mallory MP Light';
    src: url(${MalloryMpLight})
  }

  @font-face {
    font-family: 'Mallory MP Medium';
    src: url(${MalloryMpMedium})
  }

  .mallory-bold {
    font-family: 'Mallory Bold', sans-serif;
    font-weight: 700;
  }

  body {
    min-height: 100vh;
    margin: 0;
    font-family: "Mallory MP Book", sans-serif;
    font-size: ${theme.font.size.normal};
    font-weight: ${theme.font.weight.extraLight};
    letter-spacing: 0;
    line-height: 32px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${theme.color.offWhite};
    overflow-x: hidden;
  }

  h1 {
    font-size: 3.1em;
    color:  ${theme.color.black};
    font-size: ${theme.font.mobile.h1.size};
    line-height: ${theme.font.mobile.h1.lineHeight};
    font-weight: ${theme.font.mobile.h1.weight};

    @media (min-width: ${theme.breakpoints.md}px) {
      font-size: ${theme.font.desktop.h1.size};
      line-height: ${theme.font.desktop.h1.lineHeight};
      font-weight: ${theme.font.desktop.h1.weight};
    }
  }

  h2 {
    color:  ${theme.color.black};
    letter-spacing: 0;
    text-align: left;
    font-size: ${theme.font.mobile.h2.size};
    line-height: ${theme.font.mobile.h2.lineHeight};
    font-weight: ${theme.font.mobile.h2.weight};

    @media (min-width: ${theme.breakpoints.md}px) {
      font-size: ${theme.font.desktop.h2.size};
      line-height: ${theme.font.desktop.h2.lineHeight};
      font-weight: ${theme.font.desktop.h2.weight};
    }
  }

  h3 {
    color:  ${theme.color.black};
    letter-spacing: 0;
    text-align: left;
    font-size: ${theme.font.mobile.h3.size};
    line-height: ${theme.font.mobile.h3.lineHeight};
    font-weight: ${theme.font.mobile.h3.weight};

    @media (min-width: ${theme.breakpoints.md}px) {
      font-size: ${theme.font.desktop.h3.size};
      line-height: ${theme.font.desktop.h3.lineHeight};
      font-weight: ${theme.font.desktop.h3.weight};
    }
  }

  h4 {
    color:  ${theme.color.black};
    letter-spacing: 0;
    text-align: left;
    font-size: ${theme.font.mobile.h4.size};
    line-height: ${theme.font.mobile.h4.lineHeight};
    font-weight: ${theme.font.mobile.h4.weight};

    @media (min-width: ${theme.breakpoints.md}px) {
      font-size: ${theme.font.desktop.h4.size};
      line-height: ${theme.font.desktop.h4.lineHeight};
      font-weight: ${theme.font.desktop.h4.weight};
    }
  }

  h5 {
    color: #5D5D5D;
    letter-spacing: 0;
    text-align: left;
    line-height: 24px;
    font-size: ${theme.font.mobile.h5.size};
    line-height: ${theme.font.mobile.h5.lineHeight};
    font-weight: ${theme.font.mobile.h5.weight};

    @media (min-width: ${theme.breakpoints.md}px) {
      font-size: ${theme.font.desktop.h5.size};
      line-height: ${theme.font.desktop.h5.lineHeight};
      font-weight: ${theme.font.desktop.h5.weight};
    }
  }

  p {
    color: ${theme.color.black};
    letter-spacing: 0;
    text-align: left;
    font-size: ${theme.font.mobile.bodyLight.size};
    line-height: ${theme.font.mobile.bodyLight.lineHeight};
    font-weight: ${theme.font.mobile.bodyLight.weight};

    @media (min-width: ${theme.breakpoints.md}px) {
      font-size: ${theme.font.desktop.bodyLight.size};
      line-height: ${theme.font.desktop.bodyLight.lineHeight};
      font-weight: ${theme.font.desktop.bodyLight.weight};
    }
  }

  ul {
    padding-left: 0;
  }

  a {
    color: ${theme.color.link};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  hr.hideOnAboutSectionSidePanels {
    display: none;
  }

  dt {
    overflow-wrap: break-word;
  }

  code {
    color: ${theme.color.black}
  }

  .accordion-button:not(.collapsed) {
    color: ${theme.color.black}
  }

  #route-container {
    min-height: 100vh;
  }

  .top-gradient {
    background: #f7f7f7;
    background: linear-gradient(0deg,#F7F7F7 0%, #FFFFFF 100%);
  }

  .bottom-gradient {
    background: #f7f7f7;
    background: linear-gradient(180deg,#F7F7F7 0%, #FFFFFF 100%);
  }

  button.anchor {
    width: 0px;
    height: 0px;
    opacity: 0;
    visibility: hidden;
    padding: 0px;
    margin: 0px;
  }

  .spacer {
    height: 1rem;
    display: block;
    background: linear-gradient(to bottom, ${theme.color.white} 0%, ${theme.color.offWhite} 100%);
  }

  /* Bootstrap overrides */
  .badge {
    font-family: 'Mallory Bold', sans-serif;
    padding: 0.35em 0.65em;
    font-size: 0.875em;
    font-weight: 700;
    line-height: 1;
    color: #fff;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 1em;
  }

  .badge-primary {
    background-color: ${theme.color.primary.blue};
  }

  .badge-secondary {
    background-color: ${theme.color.gray};
  }

  .badge-success {
    background-color: ${theme.color.barChartGreen};
  }

  .badge-danger {
    background-color: ${theme.color.errorFg};
  }

  .badge-warning {
    background-color: #ffc107;
    color: #000;
  }

  .badge-info {
    background-color: ${theme.color.primary.teal};
  }

  .badge-light {
    background-color: ${theme.color.lightGray};
    color: ${theme.color.black};
  }

  .badge-dark {
    background-color: ${theme.color.black};
  }

  // .btn-primary {
  //   background-color: ${theme.color.primary.blue};
  //   border-color: ${theme.color.primary.blue};
  // }

  // .btn-primary:hover,
  // .btn-primary:focus,
  // .btn-primary:active {
  //   background-color: ${theme.color.primary.darkBlue};
  //   border-color: ${theme.color.primary.darkBlue};
  // }

  .btn-outline-primary {
    background-color: ${theme.color.white};
    border-color: ${theme.color.primary.blue};
    color: ${theme.color.primary.blue};
  }

  .btn-outline-primary:hover,
  .btn-outline-primary:focus,
  .btn-outline-primary:active {
    background-color: ${theme.color.primary.blue};
    border-color: ${theme.color.primary.blue};
    color: ${theme.color.white};
  }

  .btn-outline-secondary:hover,
  .btn-outline-secondary:focus,
  .btn-outline-secondary:active {
    background-color: ${theme.color.offWhite};
    border-color: ${theme.color.gray};
    color: ${theme.color.gray};
  }
`

export default GlobalStyle
