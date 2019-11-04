import * as React from 'react'
import * as _ from 'lodash'
import styled from 'styled-components'
import { ItemType, Direction } from '@/types'
import constants from 'constants/index'
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
  items: ItemType[]
  pos: number
  direction: Direction
  renderItem: (item: ItemType, index: number) => React.ReactNode
}

export const Ring: React.FC<Props> = ({ items, renderItem, pos, direction }) => {
  const step = (Math.PI * 2) / items.length
  defineKeyframes(items.length, step)

  return (
    <Container>
      {items.map((item, idx) => {
        const curr = calcPoint(idx - pos, step)
        const animationName = generateAnimationName(items.length, idx - pos, direction)

        const style = {
          ...curr,
          animationName: animationName,
          animationTimingFunction: 'linear',
          animationDuration: '0.15s',
          animationDelay: '0.0s',
          animationIterationCount: 1,
          animationDirection: 'normal',
          animationFillMode: 'forwards'
        };

        return (
          <ItemWrapper
            key={item.id || item.label}
            style={style}
          >
            {renderItem(item, idx)}
          </ItemWrapper>
        )
      })}
    </Container>
  )
}
