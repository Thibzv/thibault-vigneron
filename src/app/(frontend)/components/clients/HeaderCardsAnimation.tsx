'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function HeaderCardsAnimation() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    let isInitialized = false
    let scrollTriggers: ScrollTrigger[] = []
    let resizeTimer: NodeJS.Timeout

    const headerCardsConfig = {
      gap: 15,
      scale: 0.9,
      rotation: [3, 16, -14, 0],
      offsetX: [0, 0, 10, 0],
      offsetY: [0, 20, 50, 20],
    }

    function calculatePositions() {
      const header = document.querySelector('.main-header')
      const headerRight = document.querySelector('.main-header__right')
      const projectsSection = document.querySelector('.main-projects')
      const projectItems = document.querySelectorAll('.main-projects__item')

      if (!header || !headerRight || !projectsSection || projectItems.length === 0) {
        return null
      }

      const positions: Array<{
        card: Element
        item: Element
        index: number
        deltaX: number
        deltaY: number
        rotation: number
      }> = []
      const headerRect = headerRight.getBoundingClientRect()

      projectItems.forEach((item, index) => {
        const card = item.querySelector('.card-project')
        if (!card) return

        const itemRect = item.getBoundingClientRect()

        const itemCenterX = itemRect.left + itemRect.width / 2
        const itemCenterY = itemRect.top + itemRect.height / 2

        const offsetX = headerCardsConfig.offsetX[index] || 0
        const extraOffsetY = headerCardsConfig.offsetY[index] || 0
        const totalStackHeight = extraOffsetY * (projectItems.length - 1)
        const offsetY = extraOffsetY * index - totalStackHeight / 2

        const headerCenterX = headerRect.left + headerRect.width / 2
        const headerCenterY = headerRect.top + headerRect.height / 2

        const deltaX = headerCenterX + offsetX - itemCenterX
        const deltaY = headerCenterY + offsetY - itemCenterY

        positions.push({
          card,
          item,
          index,
          deltaX,
          deltaY,
          rotation: headerCardsConfig.rotation[index] || 0,
        })
      })

      return { positions, projectsSection }
    }

    function setupAnimation() {
      scrollTriggers.forEach((trigger) => {
        trigger.kill()
      })
      scrollTriggers = []

      const result = calculatePositions()
      if (!result) {
        return false
      }

      const { positions, projectsSection } = result

      positions.forEach(({ card, item, index, deltaX, deltaY, rotation }) => {
        gsap.set(item, {
          position: 'relative',
        })

        gsap.set(card, {
          x: deltaX,
          y: deltaY,
          scale: headerCardsConfig.scale,
          rotation: rotation,
          transformOrigin: 'center center',
          zIndex: 100 - index,
        })

        const scrollTrigger = ScrollTrigger.create({
          trigger: document.body,
          start: 'top top',
          end: () => {
            try {
              const projectsSectionTop =
                projectsSection.getBoundingClientRect().top + window.scrollY
              const distance = projectsSectionTop - window.innerHeight * 0.2
              return `${Math.max(distance, 0)} top`
            } catch (e) {
              return 'bottom bottom'
            }
          },
          scrub: 1.5,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            try {
              const progress = Math.min(Math.max(self.progress, 0), 1)

              gsap.set(card, {
                x: deltaX * (1 - progress),
                y: deltaY * (1 - progress),
                scale: headerCardsConfig.scale + (1 - headerCardsConfig.scale) * progress,
                rotation: rotation * (1 - progress),
                zIndex: progress > 0.5 ? 1 : 100 - index,
              })

              if (progress >= 1) {
                if (card.classList.contains('card-project--min')) {
                  card.classList.remove('card-project--min')
                }
              } else {
                if (!card.classList.contains('card-project--min')) {
                  card.classList.add('card-project--min')
                }
              }
            } catch (e) {
              console.warn('Error in scroll trigger update:', e)
            }
          },
        })

        scrollTriggers.push(scrollTrigger)
      })

      // Refresh après un court délai pour s'assurer que tout est prêt
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          ScrollTrigger.refresh()
          positions.forEach(({ card }, index) => {
            if (scrollTriggers[index]) {
              const initialProgress = scrollTriggers[index].progress
              if (card) {
                if (initialProgress >= 1) {
                  if (card.classList.contains('card-project--min')) {
                    card.classList.remove('card-project--min')
                  }
                } else {
                  if (!card.classList.contains('card-project--min')) {
                    card.classList.add('card-project--min')
                  }
                }
              }
            }
          })
        })
      })

      return true
    }

    function initialize() {
      if (isInitialized) return

      const checkReady = () => {
        const header = document.querySelector('.main-header')
        const projectsSection = document.querySelector('.main-projects')
        const projectItems = document.querySelectorAll('.main-projects__item')

        if (header && projectsSection && projectItems.length > 0 && window.scrollY !== undefined) {
          setTimeout(() => {
            if (setupAnimation()) {
              isInitialized = true
            }
          }, 100)
        } else {
          requestAnimationFrame(checkReady)
        }
      }

      window.addEventListener('load', () => {
        setTimeout(checkReady, 200)
      })

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          checkReady()
        })
      })
    }

    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        if (isInitialized) {
          setupAnimation()
        }
      }, 300)
    }

    window.addEventListener('resize', handleResize)

    // Écouter les changements de chargement d'images
    const images = document.querySelectorAll('.main-projects img')
    images.forEach((img) => {
      const imageElement = img as HTMLImageElement
      if (!imageElement.complete) {
        imageElement.addEventListener('load', () => {
          if (isInitialized) {
            setTimeout(() => setupAnimation(), 100)
          }
        })
      }
    })

    initialize()

    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(resizeTimer)
      scrollTriggers.forEach((trigger) => {
        trigger.kill()
      })
      scrollTriggers = []
      isInitialized = false
    }
  }, [])

  return null
}
