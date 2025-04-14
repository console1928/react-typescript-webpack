import React, { useState, useEffect } from 'react'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react'
import useNavigationButton from '../useNavigationButton'
import styles from './styles.module.scss'

interface Props {
  swiperContents: { title: string; text: string }[]
  activeSwiperIndex: number
  currentSwiperIndex: number
}

const InnerSwiper = ({ swiperContents, activeSwiperIndex, currentSwiperIndex }: Props) => {
  const [prevButtonRef, isPrevButtonRef, setIsPrevButtonRef] = useNavigationButton()
  const [nextButtonRef, isNextButtonRef, setIsNextButtonRef] = useNavigationButton()
  const [innerSwiper, setInnerSwiper] = useState<SwiperClass | null>(null)

  useEffect(() => {
    if (currentSwiperIndex === activeSwiperIndex) {
      innerSwiper?.slideTo(0)
    }
  })

  return (
    <div>
      <button
        className={`${styles.innerSwiperButton} ${styles.innerSwiperButtonPrev}`}
        ref={node => {
          prevButtonRef.current = node
          setIsPrevButtonRef(true)
        }}
      />
      <button
        className={`${styles.innerSwiperButton} ${styles.innerSwiperButtonNext}`}
        ref={node => {
          nextButtonRef.current = node
          setIsNextButtonRef(true)
        }}
      />
      <div className={styles.innerSwiperWrapper}>
        <Swiper
          className={styles.innerSwiper}
          slidesPerView={1.5}
          spaceBetween={25}
          breakpoints={{
            1024: {
              slidesPerView: 3,
              spaceBetween: 80
            }
          }}
          onSwiper={setInnerSwiper}
          speed={1000}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          navigation={{
            prevEl: prevButtonRef.current,
            nextEl: nextButtonRef.current,
            disabledClass: styles.innerSwiperButtonDisabled
          }}
          modules={[Navigation, Pagination]}
        >
          {swiperContents.map((swiperContent, index) => (
            <SwiperSlide key={index}>
              <span className={styles.innerSwiperSlideTitle}>{swiperContent.title}</span>
              <span className={styles.innerSwiperSlideText}>{swiperContent.text}</span>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default InnerSwiper
