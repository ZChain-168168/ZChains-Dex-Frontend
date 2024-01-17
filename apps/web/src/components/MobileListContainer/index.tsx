import { ReactNode } from 'react'
import { List } from 'antd'
import { Button } from '@pancakeswap/uikit'
import styled from 'styled-components'
import Empty from 'components/Empty'
import LoadingGray from 'components/LoadingGray'

const WTableMyNftMobileStyled = styled.div`
  padding-top: 12px;
  .recent-txh-mobile {
    .infinite-scroll {
      overflow-x: hidden !important;
    }
  }
`
const WTableFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
interface Props {
  total: number
  dataSource: any[]
  renderItem: (item: any, index?: number) => ReactNode
  handleLoadMore?: () => void
}
const MobileListContainer: React.FC<Props> = ({ dataSource, total, renderItem, handleLoadMore }) => {
  return (
    <WTableMyNftMobileStyled>
      {dataSource?.length > 0 ? (
        <div className="recent-txh-mobile">
          <List
            dataSource={dataSource}
            grid={{ gutter: 16, xs: 1, sm: 1, md: 1, lg: 2, xl: 3, xxl: 3 }}
            renderItem={(item, index) => <List.Item key={item?.marketId}>{renderItem(item, index)}</List.Item>}
            locale={{
              emptyText: dataSource?.length === 0 ? <div>Empty</div> : <></>,
            }}
          />
          {handleLoadMore && dataSource?.length > 0 && (
            <WTableFooter>
              <Button scale="sm" disabled={total > dataSource?.length} onClick={handleLoadMore}>
                Load More
              </Button>
            </WTableFooter>
          )}
        </div>
      ) : dataSource === undefined ? (
        <LoadingGray />
      ) : (
        <Empty />
      )}
    </WTableMyNftMobileStyled>
  )
}

export default MobileListContainer
