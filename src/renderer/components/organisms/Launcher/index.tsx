import * as React from 'react'
import styled from 'styled-components'
import { RingItem } from '@/types'
import { constants, images } from '@/constants'

import { Ring } from 'components/molecules'
import { Item } from 'components/atoms'

import { useRingPosition } from './hooks'
import { items } from './items'

const LabelWrapper = styled.div`
  margin-bottom: 30px;
  padding: 8px 15px;
  border: 2px solid #444;
  border-radius: 3px;
  background-color: #fff;
`
const Label = styled.span`
  color: #111;
  font-size: 20px;
  font-family: 'JF-Dot-milkjf-16-Bold';
`
const RingWrapper = styled.div`
  position: relative;
`
const cursorSize = 110
const Cursor = styled.img.attrs({
  src: images.cursor
})`
  position: absolute;
  top: ${constants.ring.width / 2 - constants.ring.radius - cursorSize / 2}px;
  left: ${(constants.ring.width - 110) / 2}px;
  z-index: 100;
`
const Icon = styled.img`
  width: 100%;
  height: 100%;
`

export const Launcher: React.SFC = () => {
  const [{ pos, direction }] = useRingPosition({ length: items.length })
  const currentItem: RingItem | undefined = items[pos]

  return (
    <>
      <LabelWrapper>
        <Label>{currentItem ? currentItem.label : '未選択'}</Label>
      </LabelWrapper>
      <RingWrapper>
        <Cursor />
        <Ring
          items={items}
          pos={pos}
          direction={direction}
          renderItem={item => (
            <Item>
              <Icon src={item.icon} />
            </Item>
          )}
        />
      </RingWrapper>
    </>
  )
}
