import * as React from 'react'
import Mousetrap from 'mousetrap'
import { Direction } from '@/types'

interface Props {
  length: number
}

export const useRingPosition = ({ length }: Props) => {
  const lengthWith0 = length - 1

  const rotate = React.useCallback(
    (prev: number) => (d: number): number => {
      const val = prev + d
      if (val < 0) {
        return lengthWith0
      } else if (val === 0) {
        return 0
      } else if (0 <= val && val <= lengthWith0) {
        return val
      } else if (lengthWith0 < val) {
        return 0
      }
      return lengthWith0
    },
    [lengthWith0]
  )

  const [pos, setPos] = React.useState(0)
  const [direction, setDirection] = React.useState<Direction>('right')

  React.useEffect(() => {
    Mousetrap.bind('right', () => {
      console.log('right pressed!')
      setPos(rotate(1))
      setDirection('right')
    })
    Mousetrap.bind('left', () => {
      console.log('left pressed!')
      setPos(rotate(-1))
      setDirection('left')
    })

    return () => {
      Mousetrap.reset() // remove all listeners
    }
  }, [rotate])

  return [{ pos, direction }, setPos] as const
}
