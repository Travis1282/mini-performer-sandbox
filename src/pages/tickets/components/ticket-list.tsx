import React, { FC, useRef } from 'react'
import { components } from '../../../services/maverick/generated/maverick-schema'
import TicketListItem from './ticket-list-item'
import NotFound from '../../../components/errors/not-found'
import { VariableSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'

const Row = ({ index, style, data }) => {
  return (
    <div style={style}>
      <TicketListItem event={data.event} listing={data.listings[index]} />
    </div>
  )
}

interface TicketListProps {
  listings?: components['schemas']['Listing'][]
  event: components['schemas']['Event']
}

export const TicketList: FC<TicketListProps> = ({ listings, event }) => {
  const itemSizes = useRef({})

  const getItemSize = (index: number): number => {
    if (itemSizes.current[index]) {
      return itemSizes.current[index]
    } else {
      return 76 // Default height if not measured yet
    }
  }

  const handleItemRendered = (props) => {
    for (let i = props.visibleStartIndex; i < props.visibleStopIndex + 1; i++) {
      if (itemSizes.current[i]) {
        continue
      } else {
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
    }
  }

  if (!listings || listings?.length === 0) {
    return <NotFound />
  }

  return (
    <div className="h-[calc(100vh-20.375rem)]">
      <AutoSizer>
        {({ height, width }) => (
          <List
            height={height}
            itemCount={listings.length}
            itemSize={getItemSize}
            estimatedItemSize={100}
            onItemsRendered={handleItemRendered}
            width={width}
            itemData={{ event, listings }}
          >
            {Row}
          </List>
        )}
      </AutoSizer>
    </div>
  )
}
