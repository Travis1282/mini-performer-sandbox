import type { FC } from 'react'
import type {
  ListChildComponentProps,
  ListOnItemsRenderedProps,
} from 'react-window'
import { useEffect, useRef } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { VariableSizeList as List } from 'react-window'
import type { components } from '../../../services/maverick/generated/maverick-schema'
import NotFound from '../../../components/errors/not-found'
import TicketListItem from './ticket-list-item'

const Row = ({ index, style, data }: ListChildComponentProps) => {
  return (
    <div style={style}>
      <TicketListItem event={data.event} listing={data.listings[index]} />
    </div>
  )
}

interface TicketListProps {
  event: components['schemas']['Event']
  listings?: components['schemas']['Listing'][]
}

export const TicketList: FC<TicketListProps> = ({ listings, event }) => {
  const itemSizes = useRef<Record<number, number>>({})
  const listRef = useRef<List>(null)

  const getItemSize = (index: number): number => {
    if (itemSizes.current[index]) {
      return itemSizes.current[index]
    } else {
      return 76 // Default height if not measured yet
    }
  }

  const handleItemRendered = (props: ListOnItemsRenderedProps) => {
    for (let i = props.visibleStartIndex; i < props.visibleStopIndex + 1; i++) {
      const listing = listings ? listings[i] : undefined
      if (!listing) {
        continue
      }
      const element = listing
        ? document.getElementById(`${listing.id}`)
        : undefined
      if (element) {
        itemSizes.current[i] = element.getBoundingClientRect().height
      }
    }
    listRef.current?.resetAfterIndex(props.visibleStartIndex)
  }

  useEffect(() => {
    listRef.current?.resetAfterIndex(0)
  }, [])

  if (!listings || listings?.length === 0) {
    return <NotFound />
  }

  return (
    <div className="h-[calc(100vh-20.375rem)]">
      <AutoSizer>
        {({ height, width }) => (
          <List
            estimatedItemSize={100}
            height={height}
            itemCount={listings.length}
            itemData={{ event, listings }}
            itemSize={getItemSize}
            onItemsRendered={handleItemRendered}
            ref={listRef}
            width={width}
          >
            {Row}
          </List>
        )}
      </AutoSizer>
    </div>
  )
}
