import SVG from "react-inlinesvg";
import { useEffect, useRef, useState } from "react";
import panzoom, { PanZoom } from "panzoom";
import useColorizeSVG from "../services/useColorizeSvg";

interface MapProps {
  mapSrc: string;
}

export const Map = ({ mapSrc }: MapProps) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const panZoomRef = useRef<PanZoom>(null);
  const { colorSvgSections } = useColorizeSVG({
    mapRef,
  });

  useEffect(() => {
    if (!mapLoaded) {
      return;
    }

    if (!mapRef.current) {
      return;
    }
    const svgGroup = mapRef.current.querySelector('[id="parent-group"]');
    if (!svgGroup) {
      return;
    }
    colorSvgSections();
    const panZoom = panzoom(svgGroup as SVGElement, {
      bounds: true,
      boundsPadding: 0.1,
      maxZoom: 4,
      minZoom: 0.7,
    });
    panZoomRef.current = panZoom;
  }, [mapLoaded]);

  return (
    <div
      className="bg-slate-200 flex h-[17rem] w-full origin-center transform-gpu touch-none items-center justify-center p-1"
      ref={mapRef}
    >
      <SVG
        className="h-full w-full"
        onLoad={() => {
          setMapLoaded(true);
        }}
        src={mapSrc}
      />
    </div>
  );
};
