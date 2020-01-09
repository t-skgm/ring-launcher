import * as React from 'react'
import styled from 'styled-components'
import { RingItem, Direction } from '@/types'
import { constants } from '@/constants'
import { calcPoint, defineKeyframes, generateAnimationName } from './defineKeyframes'

const { ring } = constants

const Container = styled.div`
  width: ${ring.width}px;
  height: ${ring.height}px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ItemWrapper = styled.div`
  width: ${ring.itemSize}px;
  height: ${ring.itemSize}px;
  position: absolute;
`

interface Props {
  items: RingItem[]
  pos: number
  direction: Direction
  renderItem: (item: RingItem, index: number) => React.ReactNode
}

export const Ring: React.FC<Props> = ({ items, renderItem, pos, direction }) => {
  const step = (Math.PI * 2) / items.length

  React.useMemo(() => {
    defineKeyframes(items.length, step)
  }, [items, step])

  const rendeItems = React.useCallback(
    (item: RingItem, idx: number) => {
      const point = calcPoint(idx - pos, step)
      const animationName = generateAnimationName(items.length, idx - pos, direction)

      const style = {
        ...point,
        animationName: animationName,
        animationTimingFunction: 'linear',
        animationDuration: '0.15s',
        animationDelay: '0.0s',
        animationIterationCount: 1,
        animationDirection: 'normal',
        animationFillMode: 'forwards'
      }

      return (
        <ItemWrapper key={item.id || item.label} style={style}>
          {renderItem(item, idx)}
        </ItemWrapper>
      )
    },
    [direction, items.length, pos, renderItem, step]
  )

  return <Container>{items.map(rendeItems)}</Container>
}
