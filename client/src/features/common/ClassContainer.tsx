import React from 'react'
import { Col } from 'react-bootstrap'
import { isUndefined } from 'lodash'

import TextContainer from '../common/TextContainer'
import TextValue from '../common/TextValue'
import StyledHr from '../../styles/shared/Hr'

interface IProps {
  label: string
  entityClass: string
  hrClassName: string
  hideBreaklineOnDesktop?: boolean
  textLabelClassName?: string
  textValueClassName?: string
  headerTitle?: string
}

const ClassContainerHeaderStyle: React.CSSProperties = {
  fontFamily: "Mallory Bold, sans-serif"
}

const ClassContainer: React.FC<IProps> = ({
  label,
  entityClass,
  hrClassName,
  textLabelClassName = 'col-12',
  textValueClassName = 'col-12',
  hideBreaklineOnDesktop = false,
  headerTitle,
}) => (
  <React.Fragment>
    {headerTitle && <StyledHr width="100%" className="classContainerHr" />}
    {headerTitle && <h3 className="classContainerHeader" style={ClassContainerHeaderStyle}>{headerTitle}</h3>}
    <TextContainer
      label={isUndefined(headerTitle) ? label : undefined}
      textLabelClassName={textLabelClassName}
    >
      <TextValue values={[entityClass]} className={`${textValueClassName} ms-n2`} />
      <Col xs={12}>
        <StyledHr
          className={hrClassName}
          width="100%"
          $hiddenOnDesktop={hideBreaklineOnDesktop}
        />
      </Col>
    </TextContainer>
  </React.Fragment>
)

export default ClassContainer
