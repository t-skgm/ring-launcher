import * as _ from 'lodash'
import constants from 'constants/index'
import { Direction } from '@/types'

const { ring } = constants

const calcX = (angle: number) => Math.round(ring.width / 2 + ring.radius * Math.cos(angle) - ring.itemSize / 2)
const calcY = (angle: number) => Math.round(ring.height / 2 + ring.radius * Math.sin(angle) - ring.itemSize / 2)

export const calcPoint = (pos: number, step: number, angleAdjust = 0) => {
  const angle = pos * step - Math.PI / 2 + angleAdjust
  return {
    top: calcY(angle),
    left: calcX(angle)
  }
}

const generateKeyframes = (step: number, itemIndex: number, itemCount: number): string[] => {
  const curr = calcPoint(itemIndex + 1, step, -((Math.PI * 2) / itemCount))
  const mid = calcPoint(itemIndex + 1, step, -(Math.PI / itemCount))
  const next = calcPoint(itemIndex + 1, step)
  const currL = calcPoint(itemIndex, step, -((Math.PI * 2) / itemCount))
  const midL = calcPoint(itemIndex, step, -(Math.PI / itemCount))
  const nextL = calcPoint(itemIndex, step)

  return _.flatMap(['right', 'left'], direction => {
    const animationName = `animation${itemIndex}${direction}`
    let keyframe: string
    if (direction === 'right') {
      keyframe = `
      @keyframes ${animationName} {
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
    } else {
      keyframe = `
      @keyframes ${animationName} {
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
    }
    return keyframe
  })
}

const insertRules = (stylesheet: StyleSheet, rules: string[]): void => {
  rules.forEach(rule => {
    // @ts-ignore: insertRule
    stylesheet.insertRule(rule, 0)
  })
}

///////////////////

export const defineKeyframes = _.once((itemCount: number, step: number): void => {
  console.log('[defineKeyframes]')
  // append new style elm
  const styleSheetElm = document.createElement('style')
  document.head.appendChild(styleSheetElm)
  const styleSheet = styleSheetElm.sheet!

  // insert keyframes for `itemCount` times
  Array.from({ length: itemCount }).forEach((_v, idx) => {
    const keyframes = generateKeyframes(step, idx, itemCount)
    insertRules(styleSheet, keyframes)
  })
})

export const generateAnimationName = (itemsCount: number, diff: number, direction: Direction) => {
  const i = diff < 0 ? itemsCount + diff : diff
  return `animation${i}${direction}`
}
