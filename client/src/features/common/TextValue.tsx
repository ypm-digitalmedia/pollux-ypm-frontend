import React, { type JSX, useState } from 'react'

import useResizeableWindow from '../../lib/hooks/useResizeableWindow'
import theme from '../../styles/theme'
import { StyledTextValue } from '../../styles/features/common/TextValue'

interface ITextValue {
  className?: string
  values: Array<string> | JSX.Element[]
  displayType?: string
  itemSpacing?: 'single' | 'double'
}

// Take a list of strings or React elements and wrap each item in <dd>.
const TextValue: React.FC<ITextValue> = ({
  className = 'col-md-12',
  values,
  displayType = 'block',
  itemSpacing = 'single',
}) => {

  const [isMobile, setIsMobile] = useState<boolean>(
    window.innerWidth < theme.breakpoints.md,
  )
  useResizeableWindow(setIsMobile)

  return (
    <StyledTextValue
      className={`${className} col-sm-12`}
      $displayType={displayType}
      $itemSpacing={itemSpacing}
      data-testid="text-value"
    >
      {values.map((value: string | JSX.Element, ind: number) => (
        <dd key={`${value}-${ind}`} data-testid="text-value-detail-description" className={isMobile ? 'ms-2' : 'ms-2'}>
          {value}
        </dd>
      ))}
    </StyledTextValue>
  )
}

export default TextValue
