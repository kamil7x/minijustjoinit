import { createRef, useEffect } from 'react';
import { Marker, MarkerProps } from 'react-leaflet';

interface Props extends MarkerProps {
  isOpen?: boolean;
}

export const CustomMarker = ({ isOpen, ...props }: Props) => {
  const markerRef = createRef<any>();

  useEffect(() => {
    if (markerRef.current && isOpen) {
      setTimeout(() => {
        (markerRef.current as any).openPopup();
      }, 0);
    }
  }, [markerRef.current, isOpen]);

  return <Marker ref={markerRef} {...props} />;
};
