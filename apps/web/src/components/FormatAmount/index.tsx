import CurrencyFormat from 'react-currency-format'
import { isNumber } from 'helpers/Number'

const FormatAmount: React.FC<any> = ({ value, nullValue, ...props }) => {
  if (!isNumber(value)) return <>{nullValue}</>
  return <CurrencyFormat value={value} displayType="text" thousandSeparator renderText={(v) => v} {...props} />
}

export default FormatAmount
