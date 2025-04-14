import React, { useState, useRef } from 'react'
import { EffectFade, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react'
import InnerSwiper from './innerSwiper/InnerSwiper'
import 'swiper/css'
import 'swiper/css/effect-fade'
import styles from './styles.module.scss'
import useNavigationButton from './useNavigationButton'

interface Props {
  swipersContents: { title: string; text: string }[][]
  isDrumAnimating: boolean
  setOnSwiper: (swiper: SwiperClass) => void
  setOnOuterSwiperClickIndex: (index: number) => void
}

const OuterSwiper = ({
  swipersContents,
  isDrumAnimating,
  setOnSwiper,
  setOnOuterSwiperClickIndex
}: Props) => {
  const [prevButtonRef, isPrevButtonRef, setIsPrevButtonRef] = useNavigationButton()
  const [nextButtonRef, isNextButtonRef, setIsNextButtonRef] = useNavigationButton()

  const paginationContainerRef = useRef<HTMLDivElement | null>(null)
  const [isPaginationContainerRef, setIsPaginationContainerRef] = useState(false)

  const [activeSwiperIndex, setActiveSwiperIndex] = useState<number>(0)

  const onSlideChange = (swiper: SwiperClass) => {
    setActiveSwiperIndex(swiper.activeIndex)
    setOnOuterSwiperClickIndex(swiper.activeIndex)
  }

  const pagination = {
    el: paginationContainerRef.current,
    clickable: true,
    bulletClass: 'outerSwiperCustomBullet',
    bulletActiveClass: 'outerSwiperCustomBulletActive',
    renderBullet: (index: number, className: string) => {
      return `<span class=${className}></span>`
    }
  }

  return (
    <div className={styles.outerSwiperCommonWrapper}>
      <div className={styles.outerSwiperControlsWrapper}>
        <div className={styles.outerSwiperCounter}>{`0${activeSwiperIndex + 1}/0${
          swipersContents.length
        }`}</div>
        <button
          disabled={isDrumAnimating}
          className={`${styles.outerSwiperButton} ${styles.outerSwiperButtonPrev}`}
          ref={node => {
            prevButtonRef.current = node
            setIsPrevButtonRef(true)
          }}
        />
        <button
          disabled={isDrumAnimating}
          className={`${styles.outerSwiperButton} ${styles.outerSwiperButtonNext}`}
          ref={node => {
            nextButtonRef.current = node
            setIsNextButtonRef(true)
          }}
        />
        <div
          className={
            isDrumAnimating
              ? `${styles.outerSwiperPaginationContainer} ${styles.outerSwiperPaginationContainerDisabled}`
              : styles.outerSwiperPaginationContainer
          }
          ref={node => {
            paginationContainerRef.current = node
            setIsPaginationContainerRef(true)
          }}
        ></div>
      </div>
      <div className={styles.outerSwiperWrapper}>
        <Swiper
          allowTouchMove={false}
          onSlideChange={onSlideChange}
          onSwiper={setOnSwiper}
          speed={1000}
          spaceBetween={50}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          navigation={{
            prevEl: prevButtonRef.current,
            nextEl: nextButtonRef.current,
            disabledClass: styles.outerSwiperButtonDisabled
          }}
          modules={[EffectFade, Navigation, Pagination]}
          className={styles.outerSwiper}
          pagination={pagination}
        >
          {swipersContents.map((swiperContents, index) => (
            <SwiperSlide key={index}>
              <InnerSwiper
                swiperContents={swiperContents}
                activeSwiperIndex={activeSwiperIndex}
                currentSwiperIndex={index}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default OuterSwiper
