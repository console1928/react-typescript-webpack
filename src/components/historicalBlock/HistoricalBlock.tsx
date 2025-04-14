import React, { useState } from 'react'
import { SwiperClass } from 'swiper/react'
import Drum from './drum/Drum'
import OuterSwiper from './outerSwiper/OuterSwiper'
import styles from './styles.module.scss'

interface HistoricalDataItem {
  name: string
  dates: string[]
  swiperContents: { title: string; text: string }[]
}

interface Props {
  historicalDataItems: HistoricalDataItem[]
}

const HistoricalBlock = ({ historicalDataItems }: Props) => {
  const [onSwiper, setOnSwiper] = useState<SwiperClass | null>(null)
  const [onOuterSwiperClickIndex, setOnOuterSwiperClickIndex] = useState(0)
  const [isDrumAnimating, setIsDrumAnimating] = useState(false)

  const swipersContents = historicalDataItems.map(
    historicalDataItem => historicalDataItem.swiperContents
  )
  const names = historicalDataItems.map(historicalDataItem => historicalDataItem.name)
  const dates = historicalDataItems.map(historicalDataItem => historicalDataItem.dates)

  return (
    <div className={styles.historicalBlockWrapper}>
      <div className={styles.historicalBlock}>
        <div className={styles.historicalBlockVerticalLine}></div>
        <div className={styles.historicalBlockHorizontalLine}></div>
        <Drum
          names={names}
          dates={dates}
          onSwiper={onSwiper}
          onOuterSwiperClickIndex={onOuterSwiperClickIndex}
          setIsDrumAnimating={setIsDrumAnimating}
          isDrumAnimating={isDrumAnimating}
        />
        <OuterSwiper
          swipersContents={swipersContents}
          isDrumAnimating={isDrumAnimating}
          setOnSwiper={setOnSwiper}
          setOnOuterSwiperClickIndex={setOnOuterSwiperClickIndex}
        />
      </div>
    </div>
  )
}

export default HistoricalBlock
