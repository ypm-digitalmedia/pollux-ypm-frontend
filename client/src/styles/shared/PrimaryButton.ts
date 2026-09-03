import { Button } from 'react-bootstrap'
import styled from 'styled-components'

import theme from '../theme'

const PrimaryButton = styled(Button)`
  background-color: ${theme.color.primary.blue};
  color: ${theme.color.white};
  border-radius: 0px;
  border-color: ${theme.color.primary.blue};
  font-size: 1rem;
  font-family: 'Mallory Bold', sans-serif;
  font-weight: 500;
  padding: 0.75rem;
  text-decoration: none;
  box-shadow: 1px 1px 5px ${theme.color.black20};

  &:disabled {
    background-color: ${theme.color.primary.blue};
    color: ${theme.color.white};
    border-color: ${theme.color.primary.blue};
  }

  &:hover {
    background-color: ${theme.color.primary.darkBlue};
    border-color: ${theme.color.primary.darkBlue};
    color: ${theme.color.white};
    text-decoration: none;
  }

  &.btn:active {
    background-color: ${theme.color.primary.darkBlue};
    border-color: ${theme.color.primary.darkBlue};
    color: ${theme.color.white};
  }

  &.addNewQueryButton {
    font-size: 1.5rem;
  }

  &.feedbackButton {
    font-size: 1.25rem;
  }

  &.relatedListPaginationButton {
    padding: 0.5rem;
    margin: 0px;

    &.previous {
      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;

      @media (min-width: ${theme.breakpoints.md}px) {
        border-radius: 0px;
      }
    }

    &.next {
      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;

      @media (min-width: ${theme.breakpoints.md}px) {
        border-radius: 0px;
      }
    }

    @media (min-width: ${theme.breakpoints.md}px) {
      margin: 0.25em;
      padding: 1rem;
    }
  }

  &.objectsContainerSearchLink {
    background-color: ${theme.color.white};
    color: ${theme.color.primary.blue};
    padding: 0px;
    border: none;

    @media (min-width: ${theme.breakpoints.md}px) {
      background-color: ${theme.color.primary.blue};
      color: ${theme.color.white};
      border-radius: 0px;
      border-color: ${theme.color.primary.blue};
      font-size: 16px;
      font-weight: ${theme.font.weight.bold};
      padding: 1rem;
      text-decoration: none;
    }
  }

  &.addToCollectionOnEntityPageButton {
    background-color: ${theme.color.lightGray};
    color: ${theme.color.black};
  }
`

export default PrimaryButton
