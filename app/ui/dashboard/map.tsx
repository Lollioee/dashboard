'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import { info } from 'console';
import { LocationTrackingTable } from '@/app/lib/definitions';

const buildMapInfoCardContent = (title: string, body: string): string => {
    return `
    <div class="map_infocard_content">
        <div class="map_infocard_title">${title}</div>
        <div class="map_infocard_body">${body}</div>
    </div>`;
}

function Map() {
    const getLocationTrackings = async () => {
        const res = await fetch(`https://dashboard-ochre-eight.vercel.app/api/location-overview`, {
            cache: 'no-store'
        });
        return res.json()
    }
    const mapRef = useRef<HTMLDivElement>(null)
    const [LocationTrackings, setLocationTrackings] = useState<LocationTrackingTable[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getLocationTrackings();
                setLocationTrackings(response);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // 初始化数据
        fetchData();

        // 每5秒钟轮询访问API
        const interval = setInterval(fetchData, 10000);

        // 在组件卸载时清除定时器
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (LocationTrackings.length > 0) {
            const initMap = async () => {
                const loader = new Loader({
                    apiKey: "AIzaSyBchPHXnQYSTMgpwj3uNFphWrUlfdYLh18",
                    version: 'weekly'
                })

                const { Map } = await loader.importLibrary('maps') as google.maps.MapsLibrary
                const { AdvancedMarkerElement, PinElement } = await loader.importLibrary('marker') as google.maps.MarkerLibrary

                // 43.6425662,-79.3870568
                let positionCentre = {
                    lat: Number(LocationTrackings[0].longtitude),
                    lng: Number(LocationTrackings[0].latitude)
                }

                const mapOptions = {
                    center: positionCentre,
                    zoom: 10,
                    mapId: 'PETRESCUE-1234'
                }

                // setup the map
                const map = new Map(mapRef.current as HTMLDivElement, mapOptions)
                const geocoder = new google.maps.Geocoder();

                LocationTrackings.forEach(({ longtitude, latitude, name }: { longtitude: string, latitude: string, name: string }, i: number) => {
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
                        title: `${i + 1}. ${name}`,
                        content: pin.element
                    })

                    const infoCard = new google.maps.InfoWindow({
                        position: position,
                        content: marker.title,
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

            initMap()
        }

    }, [LocationTrackings]);

    return (
        <div style={{ height: '600px' }} ref={mapRef} />
    )
}

export default Map