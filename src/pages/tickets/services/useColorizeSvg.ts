import { useCallback, useRef } from 'react'

import { getSectionElementBySvgSectionId } from './getSectionElementBySvgSectionId'
import { useVenueConfigurationContext } from './useVenueConfiguration'

interface UseColorizeSvgOptions {
  mapRef: React.RefObject<HTMLDivElement | null>
}

const useColorizeSVG = ({ mapRef }: UseColorizeSvgOptions) => {
  const { venueConfiguration, getColorBySectionId } =
    useVenueConfigurationContext()

  const hasColorized = useRef(false)

  const colorSvgSections = useCallback(() => {
    if (!mapRef.current) {
      return
    }
    venueConfiguration?.sections?.forEach((section) => {
      const color = getColorBySectionId(section.id)

      const sectionElement = getSectionElementBySvgSectionId(
        section?.svgMapId ?? '',
        mapRef.current
      )

      if (!sectionElement) {
        return
      }
      if (!hasColorized.current) {
        sectionElement.dataset.defaultColor =
          window.getComputedStyle(sectionElement).fill
        sectionElement.dataset.id = section?.id?.toString()
        sectionElement.style.transitionDelay = `${Math.random() * 0.5}s`
        sectionElement.style.transitionDuration = '0.3s'
      } else {
        sectionElement.style.transitionDuration = '0s'
        sectionElement.style.transitionDelay = '0s'
      }

      sectionElement.style.fill = color

      hasColorized.current = true
    })
  }, [mapRef])

  return {
    colorSvgSections,
  }
}

export default useColorizeSVG
