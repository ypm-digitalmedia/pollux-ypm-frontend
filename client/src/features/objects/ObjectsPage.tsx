import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { ErrorBoundary } from 'react-error-boundary'

import StyledEntityBody from '../../styles/shared/EntityBody'
import EntityHeader from '../common/EntityHeader'
import FeedbackButton from '../common/FeedbackButton'
import DataSources from '../common/DataSources'
import StyledEntityPageSection from '../../styles/shared/EntityPageSection'
import ObjectParser from '../../lib/parse/data/ObjectParser'
import ConceptParser from '../../lib/parse/data/ConceptParser'
import { ErrorFallback } from '../error/ErrorFallback'
import GenericBreadcrumbHierarchy from '../common/GenericBreadcrumbHierarchy'
import ArchiveHierarchyContainer from '../archiveHierarchy/ArchiveHierarchyContainer'
import CanIReuseIt from '../common/CanIReuseIt'
import {
  getNextSetUris,
  isEntityAnArchive
} from '../../lib/util/hierarchyHelpers'
import { archive } from '../../config/setsSearchTags'
import HowDoISeeIt from '../common/HowDoISeeIt'
import IObject from '../../types/data/IObject'
import IDigitalObject from '../../types/data/IDigitalObject'
import UV from '../common/UV'
import WikiDataImageViewer from '../common/WikiDataImageViewer'
// import ImageryMultiContainer from '../common/ImageryMultiContainer'
import IEntity from '../../types/data/IEntity'

import Carries from './Carries'
import About from './About'


const ObjectsPage: React.FC<{ data: IObject | IDigitalObject }> = ({
  data,
}) => {
  const element = new ObjectParser(data)
  const concept = new ConceptParser(data)
  const personUri = element.getAgentFromProductionEvent() || undefined
  const memberOf = element.getMemberOf()
  const objectsWithImagesHalLink = element.getHalLink(archive.searchTag)
  const halLinkTitle = archive.title
  const manifestId = element.getManifestId()  // original IIIF manifest from LUX (2D imagery)
  
  // ==========================================================================================
  // DUMMY DATA FOR DEVELOPMENT
  // ==========================================================================================
  // For testing purposes, let's generate dummy manifest URIs for the other types of imagery. In production, these would be pulled from LUX as shown in the comments in the multiImageManifests object below. 
  // The presence/absence of manifest URIs will be determined by the new middleware modifications, which will similarly return a blank string if missing, or a proper URI if present.

  const generateDummyManifestUri = (length: number = 16): string => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Helper to return either a random string or a blank string
const getRandomManifest = (chanceOfBlank: number = 0.5): string => {
  return Math.random() < chanceOfBlank ? "" : generateDummyManifestUri();
};

  // ==========================================================================================
  // Declarations below, real data needed later
  // ==========================================================================================

  const multiImageManifests = {
    '2d' : manifestId,  // original IIIF manifest from LUX (2D imagery)
    '2d360': getRandomManifest(1.0),  // rewrite this later as method such as element.get360ManifestId() to pull from LUX
    '2dzst': getRandomManifest(1.0),  // rewrite this later as method such as element.getZStackManifestId() to pull from LUX
    '2drti': getRandomManifest(1.0),  // rewrite this later as method such as element.getRTIManifestId() to pull from LUX
    '3dobj': getRandomManifest(1.0),  // rewrite this later as method such as element.get3DManifestId() to pull from LUX
    '3dvol': getRandomManifest(1.0),  // rewrite this later as method such as element.get3DVolumeManifestId() to pull from LUX
  }

  // ==========================================================================================
  

  const hierarchyData: {
    entity: IEntity
    currentPageWithinParentResultsHalLink: null | string
  } = {
    entity: data as IEntity,
    currentPageWithinParentResultsHalLink: element.getHalLink(
      'lux:itemCurrentHierarchyPage',
    ),
  }
  // console.log("element: ",element);
  // console.log("concept: ",concept);
  // console.log("data: ", data )
  // console.log(element.getAboutData())

  // console.log(multiImageManifests);

  return (
    <React.Fragment>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <EntityHeader entity={data} primaryAgent={personUri}>
          {element.json.member_of && (
            <GenericBreadcrumbHierarchy
              key={element.json.id}
              entity={data}
              divClassName="px-0"
              id="object-page"
              getNextEntityUri={getNextSetUris}
              linkFilter={isEntityAnArchive}
              maxLength={8}
            />
          )}
        </EntityHeader>
      </ErrorBoundary>
      
      {/* // this section is being deprecated temporarily.
      // UV viewer will be maintained at present, and MultiImageViewer, including Clover IIIF, will be implememented later. */}
      {/* <ErrorBoundary FallbackComponent={ErrorFallback}>
        { multiImageManifests['2d'] !== '' || multiImageManifests['2drti'] !== '' || multiImageManifests['2dzst'] !== '' || multiImageManifests['2d360'] !== '' || multiImageManifests['3dobj'] !== '' || multiImageManifests['3dvol'] !== '' ? (
          <ImageryMultiContainer
            manifestIiif={multiImageManifests['2d']}
            manifest2dRti={multiImageManifests['2drti']}
            manifest2dZst={multiImageManifests['2dzst']}
            manifest2d360={multiImageManifests['2d360']}
            manifest3dObj={multiImageManifests['3dobj']}
            manifest3dVol={multiImageManifests['3dvol']} />
        ) : (
          <WikiDataImageViewer entity={data} />
        )}
      </ErrorBoundary> */}
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        {manifestId !== '' ? (
          <UV manifest={manifestId} />
        ) : (
          <WikiDataImageViewer entity={data} />
        )}
      </ErrorBoundary>
      <StyledEntityBody>
        <Col>
          <Row>
            <Col lg={8}>
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Carries entity={data} />
              </ErrorBoundary>
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <About data={data} />
              </ErrorBoundary>
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                {memberOf.length > 0 && (
                  <ArchiveHierarchyContainer
                    key={data.id}
                    entityData={hierarchyData}
                    objectsWithImagesHalLink={objectsWithImagesHalLink}
                    halLinkTitle={halLinkTitle}
                  />
                )}
              </ErrorBoundary>
            </Col>
            <Col lg={4}>
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <StyledEntityPageSection className="row">
                  <HowDoISeeIt data={data} />
                  <CanIReuseIt entity={data} entityType="object" />
                </StyledEntityPageSection>
              </ErrorBoundary>
              <Row>
                <Col xs={12}>
                  <FeedbackButton />
                </Col>
              </Row>
              <StyledEntityPageSection className="row">
                <Col xs={12} className="my-0">
                  <DataSources entity={data} />
                </Col>
              </StyledEntityPageSection>
            </Col>
          </Row>
        </Col>
      </StyledEntityBody>
    </React.Fragment>
  )
}

export default ObjectsPage
