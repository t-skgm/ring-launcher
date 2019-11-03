import React from 'react'
import styled from 'styled-components'
import { GlobalStyle } from 'styles/Index'
import { Ring } from 'components/Ring'
import { Item } from 'components/Item'
import { ItemType } from '@/src/types'
import { useRingPosition } from './hooks'
import constants from 'constants/index'

const Container = styled.div`
  height: 100%;
  width: 100%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0);
  flex-direction: column;
`
const LabelWrapper = styled.div`
  margin-bottom: 30px;
  padding: 8px 15px;
  background-color: #fff;
  border: 2px solid #444;
  border-radius: 3px;
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
  src: require('../assets/images/cursor.png')
})`
  position: absolute;
  top: ${constants.ring.width / 2 - constants.ring.radius - cursorSize / 2}px;
  left: ${(constants.ring.width - 110) / 2}px;
  z-index: 100;
`

const items: ItemType[] = [
  { id: '1', label: 'まんまるドロップ', icon: require('../assets/images/candy.png') },
  { id: '2', label: '魔法のくるみ', icon: require('../assets/images/nut.png') },
  { id: '3', label: 'ぱっくんチョコ', icon: require('../assets/images/choco.png') },
  { id: '4', label: 'ロイヤルゼリー', icon: require('../assets/images/jam.png') },
  { id: '5', label: 'プイプイ草', icon: require('../assets/images/puipui.png') },
  { id: '6', label: '天使の聖杯', icon: require('../assets/images/cup.png') },
  { id: '7', label: '魔法のくるみ', icon: require('../assets/images/nut.png') },
  { id: '8', label: 'ぱっくんチョコ', icon: require('../assets/images/choco.png') },
  { id: '9', label: 'ロイヤルゼリー', icon: require('../assets/images/jam.png') },
  // { id: '5', label: 'プイプイ草', icon: require('../assets/images/puipui.png') },
  // { id: '6', label: '天使の聖杯', icon: require('../assets/images/cup.png') },
]

function App() {
  const [{ pos, direction }] = useRingPosition({ length: items.length })
  const currentItem: ItemType | undefined = items[pos]

  return (
    <Container>
      <GlobalStyle />
      <LabelWrapper>
        <Label>{ currentItem ? currentItem.label : '未選択' }</Label>
      </LabelWrapper>
      <RingWrapper>
        <Cursor />
        <Ring
          items={items}
          pos={pos}
          direction={direction}
          renderItem={(item) => (
            <Item>
              <img src={item.icon} />
            </Item>
          )}
        />
      </RingWrapper>
    </Container>
  )
}

export default App
