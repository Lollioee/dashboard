'use client'

import React, { useEffect, useRef } from 'react'
import { Loader } from '@googlemaps/js-api-loader'

const buildMapInfoCardContent = (title: string, body: string): string => {
    return `
    <div class="map_infocard_content">
        <div class="map_infocard_title">${title}</div>
        <div class="map_infocard_body">${body}</div>
    </div>`;
}

function Map({
    latitude,
    longitude,
    status
}: {
    latitude: string,
    longitude: string
    status: string
}) {

    const mapRef = useRef<HTMLDivElement>(null)

    useEffect(() => {

        const initMap = async () => {
            const loader = new Loader({
                apiKey: "AIzaSyBchPHXnQYSTMgpwj3uNFphWrUlfdYLh18",
                version: 'weekly'
            })

            const { Map } = await loader.importLibrary('maps') as google.maps.MapsLibrary
            const { Marker } = await loader.importLibrary('marker') as google.maps.MarkerLibrary

            // 43.6425662,-79.3870568
            let position = {
                lat: 43.6425662,
                lng: -79.3870568
            }

            if (status === "on") {
                position = {
                    lat: Number(longitude),
                    lng: Number(latitude)
                }

                const mapOptions = {
                    center: position,
                    zoom: 17,
                    mapId: 'PETRESCUE-1234'
                }

                // setup the map
                const map = new Map(mapRef.current as HTMLDivElement, mapOptions)

                const marker = new Marker({
                    map: map,
                    position: position,
                    title: "Pet found here",
                    icon: {
                        url: '/marker_flag.png',
                        size: new google.maps.Size(32, 32)
                    },
                    animation: google.maps.Animation.DROP
                })

                const infoCard = new google.maps.InfoWindow({
                    position: position,
                    content: buildMapInfoCardContent('title', 'body'),
                    minWidth: 200

                })

                infoCard.open({
                    map: map,
                    anchor: marker
                })

                marker.addListener("click", () => {
                    infoCard.open({
                      anchor: marker,
                      map,
                    });
                  });
            }
        }

        initMap()
    }, [latitude, longitude, status]);


    return (
        <div style={{ height: '600px' }} ref={mapRef} />
    )
}

export default Map