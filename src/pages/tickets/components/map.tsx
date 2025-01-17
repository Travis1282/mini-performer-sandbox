import type { PanZoom } from 'panzoom'

import panzoom from 'panzoom'
import { useEffect, useRef, useState } from 'react'
import SVG from 'react-inlinesvg'

import useColorizeSVG from '../services/useColorizeSvg'

interface MapProps {
  mapSrc: string
}

export const Map = ({ mapSrc }: MapProps) => {
  const [mapLoaded, setMapLoaded] = useState(false)
  const mapRef = useRef<HTMLDivElement>(null)
  const panZoomRef = useRef<PanZoom>(null)
  const { colorSvgSections } = useColorizeSVG({
    mapRef,
  })

  useEffect(() => {
    if (!mapLoaded) {
      return
    }

    if (!mapRef.current) {
      return
    }
    const svgGroup = mapRef.current.querySelector('[id="parent-group"]')
    if (!svgGroup) {
      return
    }
    colorSvgSections()
    const panZoom = panzoom(svgGroup as SVGElement, {
      bounds: true,
      boundsPadding: 0.1,
    })
    panZoomRef.current = panZoom
  }, [mapLoaded])

  return (
    <div className="flex h-[17rem] w-full bg-slate-200 p-1" ref={mapRef}>
      <SVG
        className="h-full w-full"
        onLoad={() => {
          setMapLoaded(true)
        }}
        src={mapSrc}
      />
    </div>
  )
}
