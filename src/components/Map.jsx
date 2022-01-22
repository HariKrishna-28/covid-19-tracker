import React from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import "../styles/Map.css"
import { showDataOnMap } from '../helpers/util'

const Map = ({ countries, casesType = "cases", center, zoom }) => {

    function ChangeView({ center, zoom }) {
        const map = useMap();
        map.setView(center, zoom);
        return null;
    }

    return (
        <div className="map">
            <MapContainer center={center} zoom={zoom} scrollWheelZoom={false}>
                <ChangeView center={center} zoom={zoom} />
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {showDataOnMap(countries, casesType)}
            </MapContainer>
        </div>
    )
}

export default Map
