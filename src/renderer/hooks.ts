import React from 'react'
import Mousetrap from 'mousetrap'
import constants from 'constants/index'

const { key } = constants

interface Props {
  length: number
}

export const useRingPosition = ({ length }: Props) => {
  const lengthWith0 = length - 1

  const rotate = (prev: number) => (d: number): number => {
    const val = prev + d
    if (val < 0) {
      return lengthWith0
    } else if (val == 0) {
      return 0
    } else if (0 <= val && val <= lengthWith0) {
      return val
    } else if (lengthWith0 < val) {
      return 0
    }
    return lengthWith0
  }

  const [pos, setPos] = React.useState(0)
  const [direction, setDirection] = React.useState<'right' | 'left'>('right')

  React.useEffect(() => {
    Mousetrap.bind('right', (ev) => {
      console.log('right!')
      setPos(rotate(key.invert ? -1 : 1))
      setDirection('right')
    })
    Mousetrap.bind('left', (ev) => {
      console.log('left!')
      setPos(rotate(key.invert ? 1 : -1))
      setDirection('left')
    })
    return () => {
      // remove all listeners
      Mousetrap.reset()
    }
  }, [])

  return [{ pos, direction }, setPos] as const
}
