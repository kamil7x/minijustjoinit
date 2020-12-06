import { MapContainer, Popup, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';

import { LatLngTuple } from 'leaflet';
import Link from 'next/link';
import { Link as UILink } from 'office-ui-fabric-react/lib/components/Link/Link';

import { JobOffer } from '../../interfaces/JobOffer';
import { OfferCard } from '../OfferCard/OfferCard';
import { CustomMarker } from './CustomMarker';

import styles from './Map.module.scss';

interface Props {
  offers: JobOffer[];
  highlightedOfferId?: string;
}

const PolandCoordinates: LatLngTuple = [51.9189046, 19.1343786];

export const Map = ({ offers, highlightedOfferId }: Props) => {
  const highlightedOffer = offers.find(
    (offer) => offer.id === highlightedOfferId,
  );
  const mapCenter = highlightedOffer
    ? [highlightedOffer.latitude, highlightedOffer.longitude]
    : PolandCoordinates;

  return (
    <MapContainer
      center={mapCenter as LatLngTuple}
      zoom={highlightedOffer ? 17 : 6}
      scrollWheelZoom={false}
      style={{ height: 500, width: '100%' }}
      className={styles.mapContainer}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* NOTE: There is a problem with 'react-leaflet-markercluster' */}
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <MarkerClusterGroup>
        {offers.map((offer) => (
          <CustomMarker
            position={[offer.latitude, offer.longitude]}
            key={offer.id}
            isOpen={offer.id === highlightedOffer?.id}
          >
            <Popup>
              <Link
                href={`offers/${encodeURIComponent(offer.id)}`}
                key={offer.id}
              >
                <UILink className={styles.offerLink}>
                  <OfferCard offer={offer} />
                </UILink>
              </Link>
            </Popup>
          </CustomMarker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};
