import { gsap } from 'gsap'
import React, { useState, useEffect, useRef } from 'react'
import Swiper from 'swiper'
import styles from './styles.module.scss'

interface Props {
  names: string[]
  dates: string[][]
  onSwiper: Swiper | null
  onOuterSwiperClickIndex: number
  setIsDrumAnimating: (isAnimating: boolean) => void
  isDrumAnimating: boolean
}

const Drum = ({
  names,
  dates,
  onSwiper,
  onOuterSwiperClickIndex,
  setIsDrumAnimating,
  isDrumAnimating
}: Props) => {
  const [prevSwiperClickIndex, setPrevSwiperClickIndex] = useState(0)
  const drumButtonsRefs = useRef([])
  const outerRef = useRef(null)
  const historicalDateStartRef = useRef(null)
  const historicalDateEndRef = useRef(null)

  useEffect(() => {
    if (onOuterSwiperClickIndex !== prevSwiperClickIndex && !isDrumAnimating) {
      animateDrum()
      animateHistoricalDates()
      setPrevSwiperClickIndex(onOuterSwiperClickIndex)
    }
  })

  useEffect(() => {
    drumButtonsRefs.current = drumButtonsRefs.current.slice(0, names.length)
  }, names)

  useEffect(() => {
    const initialAngle = 30
    const stepAngle = 360 / names.length
    drumButtonsRefs.current.forEach((drumButtonsRef, index) => {
      const turnAngle = initialAngle + index * stepAngle
      gsap.to(drumButtonsRefs.current[index], {
        transform: `rotate(${turnAngle}deg) translateY(-265px) rotate(-${turnAngle}deg)`,
        duration: 0
      })
    })
  }, drumButtonsRefs.current)

  const animateDrum = () => {
    setIsDrumAnimating(true)

    const stepAngle = 360 / names.length
    const rotationAngle = onOuterSwiperClickIndex * stepAngle

    gsap.set(outerRef.current, { transformOrigin: 'center center' })
    drumButtonsRefs.current.forEach((drumButtonsRef, index) => {
      gsap.to(drumButtonsRefs.current[index], {
        rotation: rotationAngle,
        duration: 1
      })
    })
    gsap.to(outerRef.current, {
      rotation: -rotationAngle,
      duration: 1,
      onComplete: () => setIsDrumAnimating(false)
    })
  }

  const animateHistoricalDates = () => {
    gsap.from(historicalDateStartRef.current, {
      textContent: dates[prevSwiperClickIndex][0],
      duration: 1,
      snap: {
        textContent: 1
      }
    })
    gsap.from(historicalDateEndRef.current, {
      textContent: dates[prevSwiperClickIndex][1],
      duration: 1,
      snap: {
        textContent: 1
      }
    })
  }

  const onDrumButtonClick = (index: number) => {
    onSwiper?.slideTo(index)
  }

  return (
    <div className={styles.drumWrapper}>
      <div className={styles.historicalDatesTextWrapper}>
        <span className={styles.historicalDatesText}>
          Исторические
          <br />
          даты
        </span>
      </div>
      <div className={styles.historicalDatesWrapper}>
        <span ref={historicalDateStartRef} className={styles.historicalDateStart}>
          {dates[onOuterSwiperClickIndex][0]}
        </span>
        <span ref={historicalDateEndRef} className={styles.historicalDateEnd}>
          {dates[onOuterSwiperClickIndex][1]}
        </span>
      </div>
      <span className={styles.historicalDatesName}>{names[onOuterSwiperClickIndex]}</span>
      <div ref={outerRef} className={styles.drum}>
        {names.map((name, index) => (
          <div
            ref={element => (drumButtonsRefs.current[index] = element)}
            className={styles.drumButtonWrapper}
            key={index}
          >
            <button
              onClick={() => onDrumButtonClick(index)}
              className={
                onOuterSwiperClickIndex === index
                  ? `${styles.drumButton} ${styles.drumButtonActive}`
                  : styles.drumButton
              }
            >
              <span
                className={
                  onOuterSwiperClickIndex === index
                    ? `${styles.drumButtonText} ${styles.drumButtonTextActive}`
                    : styles.drumButtonText
                }
              >
                {index + 1}
              </span>
            </button>
            <span
              className={
                onOuterSwiperClickIndex === index
                  ? `${styles.drumButtonName} ${styles.drumButtonNameActive}`
                  : styles.drumButtonName
              }
            >
              {names[index]}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Drum
