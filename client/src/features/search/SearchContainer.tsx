import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { LinksContainerRow } from '../../styles/features/search/LinksContainerRow'
import theme from '../../styles/theme'
import ToggleButton from '../advancedSearch/ToggleSearchButton'
import { pushClientEvent } from '../../lib/pushClientEvent'
import useResizeableWindow from '../../lib/hooks/useResizeableWindow'

import AdvancedSearchButton from './AdvancedSearchButton'
import SearchBox from './SearchBox'
import ErrorMessage from './ErrorMessage'

interface IProps {
  className: string
  id: string
  bgColor: string
  isBelowFold: boolean
  searchTipsStyle?: {
    color: string
    textDecoration: string
  }
  isResultsPage?: boolean
}

const SearchContainer: React.FC<IProps> = ({
  className,
  id,
  bgColor,
  isBelowFold,
  searchTipsStyle = {
    color: theme.color.link,
    textDecoration: 'none',
  },
  isResultsPage = false,
}) => {
  const [isError, setIsError] = useState<boolean>(false)
  const [isMobile, setIsMobile] = useState<boolean>(
    window.innerWidth < theme.breakpoints.md,
  )
  useResizeableWindow(setIsMobile)

  return (
    <Row
      className={`d-flex mx-0 ${className} ${isMobile ? 'py-1' : 'py-3'}`}
      style={{ backgroundColor: bgColor }}
      id={id}
    >
      <Col xs={12}>
        {isError && <ErrorMessage onClose={setIsError} />}
        <SearchBox
          id={id}
          isBelowFold={isBelowFold}
          setIsError={setIsError}
          isResults={isResultsPage}
        />
      </Col>
      {isResultsPage ? (
        <Col xs={12} className="d-flex justify-content-center">
          <div
            className="d-flex justify-content-end"
            style={{ width: theme.searchBox.width }}
          >
            <ToggleButton setIsError={setIsError} />
          </div>
        </Col>
      ) : (
        <Col
          xs={12}
          className="d-flex justify-content-center align-items-center mt-3"
        >
          <LinksContainerRow>
            <Col xs={6} className="d-inline-flex justify-content-start">
              <AdvancedSearchButton setIsError={setIsError} id={id} />
            </Col>
            <Col xs={6} className="d-inline-flex justify-content-end">
              <a href="/content/about-lux">
                <div className="powered-by" style={{ color: searchTipsStyle.color }}>
                  <span
                    className="lux-powered-by"
                    style={{ color: searchTipsStyle.color }}
                  >
                    Powered by
                  </span>
                  <span
                    className="lux-name"
                    style={{ color: searchTipsStyle.color }}
                  >
                    {' '}LUX
                  </span>
                  &nbsp;
                  <i className="bi bi-question-circle"></i>
                </div>
              </a>
            </Col>
          </LinksContainerRow>
        </Col>
      )}
    </Row>
  )
}

export default SearchContainer
