/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, type JSX } from 'react'
import { Link, useParams } from 'react-router-dom'
import { isUndefined } from 'lodash'
import { useAuth } from 'react-oidc-context'
import { useDispatch } from 'react-redux'

import StyledSnippetTitle from '../../styles/features/results/SnippetTitle'
import { stripYaleIdPrefix } from '../../lib/parse/data/helper'
import PreviewImageOrIcon from '../common/PreviewImageOrIcon'
import { pushClientEvent } from '../../lib/pushClientEvent'
import EntityParser from '../../lib/parse/data/EntityParser'
import formattedDisplayName from '../common/FormattedDisplayName'
import config from '../../config/config'
import {
  IMyCollectionsResultsState,
  addEntity,
  removeEntity,
} from '../../redux/slices/myCollectionsSlice'
import { useAppSelector } from '../../app/hooks'
import { ResultsTab } from '../../types/ResultsTab'

interface IProps {
  data: any
  snippetData: JSX.Element
  className: string
  mapComponent?: JSX.Element
  children?: JSX.Element
  titleOfTabbedContent?: string
}

const SnippetHeader: React.FC<IProps> = ({
  data,
  snippetData,
  className,
  mapComponent,
  children,
  titleOfTabbedContent,
}) => {
  const dispatch = useDispatch()
  const { tab, subTab } = useParams<keyof ResultsTab>() as ResultsTab
  const auth = useAuth()
  const userIsAuthenticate = auth.isAuthenticated
  const entity = new EntityParser(data)
  const images = entity.getImages()
  const primaryName = entity.getPrimaryName(config.aat.langen)
  const currentEntityUuid = entity.json.id as string

  const currentMyCollectionState = useAppSelector(
    (myCollectionsState) =>
      myCollectionsState.myCollections as IMyCollectionsResultsState,
  )
  // is the current entity selected
  const isChecked = currentMyCollectionState.uuids.includes(currentEntityUuid)

  // Handle the selection of the entity's checkbox
  const handleCheckboxSelection = (e: ChangeEvent<HTMLInputElement>): void => {
    const uuid = e.target.value
    if (isChecked) {
      dispatch(removeEntity({ uuid }))
    } else {
      const scopeToSet = subTab || tab || titleOfTabbedContent
      // if the subTab is not undefined, set scope to the subTab, otherwise set as the current tab
      dispatch(
        addEntity({
          uuid,
          scope: scopeToSet,
        }),
      )
    }
  }

  // reused from EntityHeader.tsx -- Move to centralized logic?
  // need to update this with new AATs in future
  // i.e. Botany
  // Human-made and Minerals don't matter in this context -- this is just for catalog number purposes

    const isBiologicalEntity = 
    entity.isClassifiedAs(config.aat.plantSpecimens) ||
    entity.isClassifiedAs(config.aat.animalSpecimens) ||
    entity.isClassifiedAs(config.aat.fossil) ||
    entity.isClassifiedAs(config.aat.biologicalSpecimens); 

  const isPlantEntity = 
    entity.isClassifiedAs(config.aat.plantSpecimens);

  return (
    <React.Fragment>
      <div className="flex-shrink-0">
        {!isUndefined(mapComponent) ? (
          mapComponent
        ) : (
          <PreviewImageOrIcon images={images} entity={data} />
        )}
      </div>
      <div className={`flex-grow-1 ms-3 ${className}`} data-testid={className}>
        <StyledSnippetTitle
          className="d-flex w-100"
          data-testid="results-snippet-title"
        >
          <Link
            to={{
              pathname: `/view/${stripYaleIdPrefix(data.id)}`,
            }}
            onClick={() =>
              pushClientEvent('Entity Link', 'Selected', 'Results Snippet Link')
            }
            style={{
              width: 'inherit',
            }}
          >
            {isBiologicalEntity || isPlantEntity ? 
              primaryName.length > 150 ? 
                `${formattedDisplayName({ text: primaryName.slice(0,170) })}...`
              : formattedDisplayName({ text: primaryName }) 
            : primaryName.length > 150
              ? `${primaryName.slice(0, 150)}...`
              : primaryName
            }

            {/* {primaryName.length > 150
              ? `${primaryName.slice(0, 150)}...`
              : primaryName} */}
            {children}
          </Link>
          {userIsAuthenticate && (
            <span className="d-flex align-items-center">
              <input
                className="form-check-input d-inline mt-0 float-right selectResultCheckbox"
                type="checkbox"
                id="select-all-checkbox"
                value={currentEntityUuid}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleCheckboxSelection(e)
                }
                checked={isChecked}
              />
              <label
                hidden
                className="form-check-label ms-2"
                htmlFor="select-all-checkbox"
              >
                Select {primaryName}
              </label>
            </span>
          )}
        </StyledSnippetTitle>
        {snippetData}
      </div>
    </React.Fragment>
  )
}

export default SnippetHeader
