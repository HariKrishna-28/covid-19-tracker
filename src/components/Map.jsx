import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import "../styles/Map.css"
import { showDataOnMap } from '../helpers/util'

const Map = ({ countries, caseType = "cases", center, zoom }) => {
    return (
        <div className="map">
            <MapContainer center={center} zoom={zoom}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {showDataOnMap(countries, caseType)}
            </MapContainer>
        </div>
    )
}

export default Map
