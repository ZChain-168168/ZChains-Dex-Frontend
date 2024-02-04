import React from 'react'
import CurrencyFormat from 'react-currency-format'
import { roundNumber } from 'helpers'

const Amount: React.FC<{ value: any; suffix?: any }> = ({ value, ...props }) => (
  <>
    {value !== undefined ? (
      <CurrencyFormat
        value={roundNumber(value, { scale: 2 })}
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
