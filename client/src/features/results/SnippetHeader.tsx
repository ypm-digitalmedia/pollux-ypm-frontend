/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { type JSX } from 'react'
import { Link } from 'react-router-dom'
import { isUndefined } from 'lodash'

import StyledSnippetTitle from '../../styles/features/results/SnippetTitle'
import { stripYaleIdPrefix } from '../../lib/parse/data/helper'
import PreviewImageOrIcon from '../common/PreviewImageOrIcon'
import { pushClientEvent } from '../../lib/pushClientEvent'
import EntityParser from '../../lib/parse/data/EntityParser'
import formattedDisplayName from '../common/FormattedDisplayName'
import config from '../../config/config'

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
}) => {
  const entity = new EntityParser(data)
  const images = entity.getImages()
  const primaryName = entity.getPrimaryName(config.aat.langen)

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
        </StyledSnippetTitle>
        {snippetData}
      </div>
    </React.Fragment>
  )
}

export default SnippetHeader
