import React from 'react'
import CurrencyFormat from 'react-currency-format'
import { roundNumber } from 'helpers'

const Amount: React.FC<{ value }> = ({ value, ...props }) => (
  <>
    {value !== undefined ? (
      <CurrencyFormat
        value={roundNumber(value, { scale: 2 })}
        thousandSeparator
        displayType="text"
        suffix={` OPV`}
        renderText={(txt) => txt}
        {...props}
      />
    ) : (
      '-'
    )}
  </>
)

export default Amount
