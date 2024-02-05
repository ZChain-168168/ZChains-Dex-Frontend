import React from 'react'
import CurrencyFormat from 'react-currency-format'
import { roundNumber } from 'helpers'

const Amount: React.FC<{ value: any; suffix?: any; scale?: number }> = ({ value, scale = 2, ...props }) => (
  <>
    {value !== undefined ? (
      <CurrencyFormat
        value={value}
        thousandSeparator
        displayType="text"
        suffix={` CREDIT`}
        renderText={(txt) => txt}
        {...props}
      />
    ) : (
      '-'
    )}
  </>
)

export default Amount
