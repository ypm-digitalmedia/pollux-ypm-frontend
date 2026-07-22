import React, { type JSX } from 'react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import ReactTooltip from 'react-bootstrap/Tooltip'
import sanitizeHtml from 'sanitize-html'
import styled from 'styled-components'

import theme from '../../styles/theme'

export type Placement = 'top' | 'bottom' | 'left' | 'right'

interface IProps {
  html: string
  children: React.JSX.Element
  placement?: Placement
}

const arrowBorderColors: { [key: string]: string } = {
  top: `${theme.color.gray} transparent transparent transparent`,
  bottom: `transparent transparent ${theme.color.gray} transparent`,
  left: `transparent transparent transparent ${theme.color.gray}`,
  right: `transparent ${theme.color.gray} transparent transparent `,
}

const StyledTooltip = styled(ReactTooltip)<{ placement: Placement }>`
  &.show {
    opacity: 1;
  }

  .tooltip-arrow:before {
    border-color: ${({ placement }) => arrowBorderColors[placement || 'none']};
  }
  .tooltip-inner {
    border: solid 1px ${theme.color.black65};
    font-family: Mallory Light, sans-serif;
    padding: 8px 16px;
    min-width: auto;
    background-color: ${theme.color.lightGray};
    color: ${theme.color.black};
    font-size: 0.95rem;
    opacity: 0.95;
    text-align: left;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }
`

const Tooltip: React.FC<IProps> = ({
  html,
  children,
  placement = 'bottom',
}) => {
  const renderTooltip = (inPlacement: Placement): React.JSX.Element => (
    <StyledTooltip placement={inPlacement}>
      <span
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(html, { allowedTags: [] }),
        }}
      />
    </StyledTooltip>
  )

  return (
    <OverlayTrigger placement={placement} overlay={renderTooltip(placement)}>
      {children}
    </OverlayTrigger>
  )
}

export default Tooltip
