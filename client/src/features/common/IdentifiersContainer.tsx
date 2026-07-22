import React from 'react'
import { Col } from 'react-bootstrap'

import StyledDataRow from '../../styles/shared/DataRow'
import StyledHr from '../../styles/shared/Hr'
import StyledTextLabel from '../../styles/features/common/TextLabel'

import IdentifiersList from './IdentifiersList'

interface IIdentifiers {
  identifiers: Array<{
    label: string
    identifier: Array<string>
    carriedOutBy: Array<string>
  }>
  id: string
}

const IdentifiersContainer: React.FC<IIdentifiers> = ({ identifiers, id }) => (
  <StyledDataRow className="row ">
    <Col xs={12} className="identifiers-header-custom">
    <button className="anchor" id="identifiers" />
    {/* <dt data-testid={`${id}-identifier-label`}>Identifiers</dt> */}
    {/* <StyledTextLabel data-testid={`${id}-identifier-label`}>
      Identifiers
    </StyledTextLabel> */}
    </Col>
    <Col xs={12}>
      <IdentifiersList identifiers={identifiers} />
    </Col>
    <Col xs={12}>
      <StyledHr width="100%" className="identifiersContainerHr" />
    </Col>
  </StyledDataRow>
)

export default IdentifiersContainer
