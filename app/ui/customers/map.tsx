'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import { info } from 'console';

const buildMapInfoCardContent = (title: string, body: string): string => {
    return `
    <div class="map_infocard_content">
        <div class="map_infocard_title">${title}</div>
        <div class="map_infocard_body">${body}</div>
    </div>`;
}

function Map({
    id
}: {
    id: string
}) {
    const getLocationTrackings = async () => {
        const res = await fetch(`/api/locationbyid/?id=${id}`, {
            cache: 'no-store'
        });
        return res.json()
    }

    const mapRef = useRef<HTMLDivElement>(null)
    const [infoWindowOpen, setInfoWindowOpen] = useState<boolean>(false);

    useEffect(() => {

        const initMap = async () => {
            const loader = new Loader({
                apiKey: "AIzaSyBchPHXnQYSTMgpwj3uNFphWrUlfdYLh18",
                version: 'weekly'
            })

            const { Map } = await loader.importLibrary('maps') as google.maps.MapsLibrary
            const { AdvancedMarkerElement, PinElement } = await loader.importLibrary('marker') as google.maps.MarkerLibrary

            const LocationTrackings = await getLocationTrackings()

            if (LocationTrackings.length > 0) {

                // 43.6425662,-79.3870568
                let positionCentre = {
                    lat: Number(LocationTrackings[0].longtitude),
                    lng: Number(LocationTrackings[0].latitude)
                }

                const mapOptions = {
                    center: positionCentre,
                    zoom: 17,
                    mapId: 'PETRESCUE-1234'
                }

                // setup the map
                const map = new Map(mapRef.current as HTMLDivElement, mapOptions)
                const geocoder = new google.maps.Geocoder();

                LocationTrackings.forEach(({ longtitude, latitude }: { longtitude: string, latitude: string }, i: number) => {
                    const pin = new PinElement({
                        glyph: `${i + 1}`,
                    });

                    let position = {
                        lat: Number(longtitude),
                        lng: Number(latitude)
                    }

                    const marker = new AdvancedMarkerElement({
                        map: map,
                        position: position,
                        title: "Pet found here",
                        content: pin.element
                    })

                    const infoCard = new google.maps.InfoWindow({
                        position: position,
                        content: buildMapInfoCardContent('title', 'body'),
                        minWidth: 200
                    })

                    marker.addListener("click", () => {
                        infoCard.open({
                            anchor: marker,
                            map,
                        });
                        infoCard.focus();
                    });
                });
            }
        }

        initMap()

    }, [infoWindowOpen]);

    return (
        <div style={{ height: '600px' }} ref={mapRef} />
    )
}

export default Map