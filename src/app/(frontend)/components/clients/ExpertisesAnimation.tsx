'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function ExpertisesAnimation() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const expertisesSection = document.querySelector('.main-expertises__container')
    const logosList1 = document.querySelector(
      '.main-expertises__logos:not(.main-expertises__logos--reversed)',
    )
    const logosList2 = document.querySelector('.main-expertises__logos--reversed')

    if (expertisesSection && logosList1 && logosList2) {
      const logosHeight = logosList1.scrollHeight
      const totalDistance = logosHeight * 0.65

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: expertisesSection,
          start: 'center center',
          end: `+=${totalDistance}`,
          pin: true,
          scrub: 1,
        },
      })

      tl.to(
        logosList1,
        {
          y: -totalDistance,
          ease: 'none',
        },
        0,
      )

      tl.to(
        logosList2,
        {
          y: totalDistance,
          ease: 'none',
        },
        0,
      )

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.vars.trigger === expertisesSection) {
            trigger.kill()
          }
        })
      }
    }
  }, [])

  return null
}
