import * as React from 'react'
import * as _ from 'lodash'
import styled from 'styled-components'
import { ItemType } from '@/src/types'
import constants from 'constants/index'

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

const calcX = (angle: number) => Math.round(ring.width / 2 + ring.radius * (Math.cos(angle)) - ring.itemSize / 2);
const calcY = (angle: number) => Math.round(ring.height / 2 + ring.radius * (Math.sin(angle)) - ring.itemSize / 2);

interface Props {
  items: ItemType[]
  pos: number
  direction: 'right' | 'left'
  renderItem: (item: ItemType, index: number) => React.ReactNode
}

const calcPoint = (pos: number, step: number, angleAdjust: number = 0) => {
  const angle = pos * step - (Math.PI / 2) + angleAdjust
  return {
    top: calcY(angle),
    left: calcX(angle)
  }
}

const defineFrameNamesOnce = _.once((length: number): string[] => {
  const styleSheetElm = document.createElement('style');
  document.head.appendChild(styleSheetElm);
  const styleSheet = styleSheetElm.sheet;

  const insertKeyframes = (idx: number): string[] => {
    const curr = calcPoint(idx + 1, step, - (Math.PI * 2 / length))
    const mid = calcPoint(idx + 1, step, - (Math.PI / length))
    const next = calcPoint(idx + 1, step)

    const currL = calcPoint(idx, step, - (Math.PI * 2 / length))
    const midL = calcPoint(idx, step, - (Math.PI / length))
    const nextL = calcPoint(idx, step)

    return _.flatMap(['right', 'left'], direction => {
      const animationName = `animation${idx}${direction}`
      const keyframesRight =
      `@keyframes ${animationName} {
        0% {
          top: ${next.top}px;
          left: ${next.left}px;
        }
        50% {
          top: ${mid.top}px;
          left: ${mid.left}px;
        }
        100% {
          top: ${curr.top}px;
          left: ${curr.left}px;
        }
      }`
      const keyframesLeft =
      `@keyframes ${animationName} {
        0% {
          top: ${currL.top}px;
          left: ${currL.left}px;
        }
        50% {
          top: ${midL.top}px;
          left: ${midL.left}px;
        }
        100% {
          top: ${nextL.top}px;
          left: ${nextL.left}px;
        }
      }`
      const keyframes = direction === 'right' ? keyframesRight : keyframesLeft
      console.log('keyframes', keyframes)
      // @ts-ignore
      styleSheet.insertRule(keyframes, 0)
      return animationName
    })
  }

  const step = (Math.PI * 2) / length

  const mapped = Array.from({ length }, (_v, idx) => {
    const animationName = insertKeyframes(idx)
    return animationName
  })

  return _.flatten(mapped)
})

export const Ring: React.FC<Props> = ({ items, renderItem, pos, direction }) => {
  const step = (Math.PI * 2) / items.length
  defineFrameNamesOnce(items.length)

  return (
    <Container>
      {items.map((item, idx) => {
        const curr = calcPoint(idx - pos, step)
        const i = (idx - pos < 0) ? items.length + idx - pos : idx - pos
        const animationName = `animation${i}${direction}`

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
