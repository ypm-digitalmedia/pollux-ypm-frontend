import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Col, Row } from 'react-bootstrap'
import { useAuth } from 'react-oidc-context'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import StyledEntityHeader from '../../styles/features/common/EntityHeader'
import formattedDisplayName from './FormattedDisplayName'
import {
  useResizableName,
  shortenIfNeeded,
} from '../../lib/hooks/useResizableName'
import useTitle from '../../lib/hooks/useTitle'
import IEntity from '../../types/data/IEntity'
import EntityParser from '../../lib/parse/data/EntityParser'
import config from '../../config/config'
import theme from '../../styles/theme'
import useResizeableWindow from '../../lib/hooks/useResizeableWindow'
import AddToCollectionButton from '../myCollections/AddToCollectionButton'
import AddToCollectionModal from '../myCollections/AddToCollectionModal'
import { pushClientEvent } from '../../lib/pushClientEvent'
import CreateCollectionModal from '../myCollections/CreateCollectionModal'
import { IRouteState } from '../../types/myCollections/IRouteState'
import MyCollectionsAlert from '../myCollections/Alert'
import { collectionsIcon } from '../../config/resources'
import { addEntity } from '../../redux/slices/myCollectionsSlice'
import { getFormattedUuidFromPathname } from '../../lib/myCollections/helper'
import { useGetUserResultsQuery } from '../../redux/api/ml_api'
import { getOrderedItemsIds } from '../../lib/parse/search/searchResultParser'
import { formatScientificName } from '../../lib/util/collectionHelper'

import Dates from './Dates'
import AgentInHeader from './AgentInHeader'
import AgentData from './AgentData'
import Tooltip from './Tooltip'

interface IEntityHeader {
  entity: IEntity
  primaryAgent?: string
  start?: string
  end?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: any
}

const StyledImg = styled.img`
  display: none;

  @media (min-width: ${theme.breakpoints.md}px) {
    display: initial;
  }
`

/**
 * Returns the header for all entity pages with the provided data
 * @param {IEntity} entity data for the current entity
 * @param {string} primaryAgent optional; the person or group responsible for the creation of the entity
 * @param {string} start optional; the start year
 * @param {string} end optional; the end year
 * @param {any} children optional; child components to be rendering within the header
 * @returns {JSX.Element}
 */
const EntityHeader: React.FC<IEntityHeader> = ({
  entity,
  primaryAgent,
  start,
  end,
  children,
}) => {
  const auth = useAuth()
  const isAuthenticated = auth.isAuthenticated
  const dispatch = useDispatch()
  const { pathname, state } = useLocation() as {
    pathname: string
    state: IRouteState
  }

  const username = auth.user?.profile['cognito:username']

  // get the current logged in user's record
  const { data, isSuccess } = useGetUserResultsQuery(
    {
      username,
    },
    { skip: !isAuthenticated || !username },
  )

  const [showAddToCollectionModal, setShowAddToCollectionModal] =
    useState<boolean>(false)
  const [showCreateCollectionModal, setShowCreateCollectionModal] =
    useState<boolean>(false)
  const [alert, setAlert] = useState<IRouteState>({
    showAlert: false,
    alertMessage: '',
    alertVariant: 'primary',
  })

  const [isMobile, setIsMobile] = useState<boolean>(
    window.innerWidth < theme.breakpoints.md,
  )
  useResizeableWindow(setIsMobile)
  const agentData = AgentData(primaryAgent)

  const element = new EntityParser(entity)
  const name = element.getPrimaryName(config.aat.langen)
  const [typeIcon, helperText] = element.getSupertypeIcon()

  const { displayName, isNameLong, showLongName, setShowLongName } =
    useResizableName(name)

  useEffect(() => {
    if (state && state.hasOwnProperty('showAlert')) {
      setAlert(state as IRouteState)
    }
  }, [state])

  // event to handle the closing of the add to collection modal
  const handleCloseAddModal = (): void => {
    pushClientEvent('My Collections', 'Closed', 'Add to My Collections modal')
    setShowAddToCollectionModal(false)
  }

  // event to handle the closing of the create a collection modal
  const handleCloseCreateCollectionModal = (): void => {
    pushClientEvent('My Collections', 'Closed', 'Delete Collections modal')
    setShowCreateCollectionModal(false)
  }

  const handleShowAddToCollectionModal = (): void => {
    dispatch(
      addEntity({
        uuid: getFormattedUuidFromPathname(pathname),
        scope: 'collections',
      }),
    )
    setShowAddToCollectionModal(true)
  }
  
  const isBiologicalEntity = 
    element.isClassifiedAs(config.aat.plantSpecimens) ||
    element.isClassifiedAs(config.aat.animalSpecimens) ||
    element.isClassifiedAs(config.aat.fossil) ||
    element.isClassifiedAs(config.aat.biologicalSpecimens); 

  const isPlantEntity = 
    element.isClassifiedAs(config.aat.plantSpecimens);

  const isMineralEntity = 
    element.isClassifiedAs(config.aat.gemstone) ||
    element.isClassifiedAs(config.aat.mineralSpecimens) ||
    element.isClassifiedAs(config.aat.meteoriteSpecimens) ||
    element.isClassifiedAs(config.aat.inorganicMaterials);

  const isHumanMadeEntity = 
    element.isClassifiedAs(config.aat.culturalArtifacts) ||
    element.isClassifiedAs(config.aat.equipmentScienceTechnology) ||
    element.isClassifiedAs(config.aat.toolsEquipment) ||
    element.isClassifiedAs(config.aat.scientificInstruments);
    // TODO: add more AAT classifications for ANT, BC

  const isSpecies = element.isSpeciesOrLower();
  const isGenus = element.isGenusOrLower();



  const catalogNumberDisplay = (): string => {
      
      // return item 0 / Catalog Number
      // ALTERNATE: return item 1 / Repository number instead (for brevity ; potential errors)
      
      if( isBiologicalEntity || isPlantEntity || isMineralEntity || isHumanMadeEntity) {
        if (element.getIdentifiers().length > 0 && element.getIdentifiers()[0].identifier.length > 0) {
          return element.getIdentifiers()[0].identifier[0];
        } else {
          return '';
        }    
      } else {
        return '';
      }
  }
  
  // console.log("element: " , element);
  // console.log("is species? ", isSpecies);
  // console.log("types: " , element.getTypes());
  // console.log("entity", entity);
  // console.log("formatted scientific name: ", formatScientificName(displayName));
  // console.log(element.getPrimaryName(config.aat.langen));
  // console.log("is biological entity? ", isBiologicalEntity);
  // console.log("is plant entity? ", isPlantEntity);
  // console.log("is mineral entity? ", isMineralEntity);
  // console.log("is human made entity? ", isHumanMadeEntity);

  return (
    <React.Fragment>
      {alert.showAlert && (
        <MyCollectionsAlert
          variant={alert.alertVariant as string}
          message={alert.alertMessage as string}
          handleOnClose={setAlert}
        />
      )}
      {showAddToCollectionModal && (
        <AddToCollectionModal
          showModal={showAddToCollectionModal}
          onClose={handleCloseAddModal}
          showCreateNewModal={setShowCreateCollectionModal}
          userUuid={
            isSuccess && getOrderedItemsIds(data).length > 0
              ? getOrderedItemsIds(data)[0]
              : undefined
          }
          addingSingleEntityFromEntityPage
        />
      )}
      {showCreateCollectionModal && (
        <CreateCollectionModal
          showModal={showCreateCollectionModal}
          onClose={handleCloseCreateCollectionModal}
        />
      )}
      <StyledEntityHeader className="py-3">
        <Col xs={12} sm={12} md={12} lg={isAuthenticated ? 9 : 12}>
          <Row>
            <Col xs={12} className="d-flex text-start p-0">
              <h1 className={isMobile?"d-flex main-label-title": "d-flex-main-label-title ps-4"}>
                <span data-testid="entity-header">
                  {/* <Tooltip html={helperText} placement="bottom">
                    <StyledImg
                      src={typeIcon}
                      alt={`icon for ${helperText}`}
                      id="icon"
                      height={70}
                      width={70}
                      className="me-2"
                      data-testid="entity-icon-img"
                    />
                  </Tooltip> */}
                  {isBiologicalEntity || isPlantEntity || isGenus ? formattedDisplayName({ text: displayName }) : displayName}
                  {/* {displayName} */}
                  <Dates start={start || ''} end={end || ''} />
                  {isNameLong &&
                    (showLongName ? (
                      <button
                        type="button"
                        className="btn btn-link show-more"
                        onClick={() => setShowLongName(false)}
                      >
                        Shorten Name
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-link show-more"
                        onClick={() => setShowLongName(true)}
                      >
                        Show Full Name
                      </button>
                    ))}
                </span>
                <span className="entity-supertype-icon">
                  <Tooltip html={helperText} placement="bottom">
                    <StyledImg
                      src={typeIcon}
                      alt={`icon for ${helperText}`}
                      id="icon"
                      height={70}
                      width={70}
                      className="mx-2"
                      data-testid="entity-icon-img"
                    />
                  </Tooltip>
                </span>
              </h1>
            </Col>
            {agentData && (
              <Col  xs={12} sm={12} md={12} lg={12} className={isMobile? "text-start p-0 entity-agent-header-data": "text-start p-0 entity-agent-header-data ps-4"}>
                <AgentInHeader data={agentData} />
              </Col>
            )}
            {catalogNumberDisplay() && (
              <Col xs={12} sm={12} md={12} lg={12} className={isMobile? "text-start p-0 entity-catalog-number": "text-start p-0 entity-catalog-number ps-4"}>
                <a href="#identifiers" data-testid="catalog-number-anchor-link" className="identifier-anchor-link">
                <span className="catalog-number-display">
                  <i className="bi bi-upc-scan pe-2"></i>
                  {catalogNumberDisplay()}
                </span>
                </a>
              </Col>
            )}
            {children}
          </Row>
          {/* {entity._label && (
          <Row>
            <Col className={isMobile? "text-start p-0 entity-catalog-number": "text-start p-0 entity-catalog-number ps-4"}>
                <span>
                  {entity._label}
                </span>
            </Col>
          </Row>
          )} */}
        </Col>
        {isAuthenticated && (
          <Col
            xs={12}
            sm={12}
            md={12}
            lg={isMobile ? 12 : 3}
            className="d-flex align-items-center justify-content-center"
          >
            <AddToCollectionButton
              additionalClassName="addToCollectionOnEntityPageButton"
              setShowModal={handleShowAddToCollectionModal}
              disabled={false}
            >
              <Row>
                <Col xs={3} className="d-flex float-left w-auto">
                  <img
                    src={collectionsIcon}
                    alt="icon for my collections"
                    id="icon"
                    height={60}
                    width={60}
                    data-testid="my-collection-icon-img"
                  />
                </Col>
                <Col className="px-0">
                  <Row>
                    <Col
                      xs={12}
                      className="d-flex float-left"
                      style={{
                        fontSize: '24px',
                        fontWeight: theme.font.weight.medium,
                      }}
                    >
                      My Collections
                    </Col>
                    <Col
                      xs={12}
                      className="d-flex float-left"
                      style={{
                        color: theme.color.link,
                        fontWeight: theme.font.weight.light,
                      }}
                    >
                      Add this record
                    </Col>
                  </Row>
                </Col>
              </Row>
            </AddToCollectionButton>
          </Col>
        )}
      </StyledEntityHeader>
    </React.Fragment>
  )
}

export default EntityHeader
