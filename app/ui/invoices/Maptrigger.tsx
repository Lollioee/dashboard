'use client';

import { MapPinIcon, MapIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation'
import React, { useReducer, useState } from 'react'
import MapDialog from './dialog/map-dialog';

enum AlertDialogReasonEnum {
    NONE = "",
    MARK_COMPLETE = 'complete',
    DELETE = 'delete'
}

interface RowActionReducerProps {
    alertDialog?: boolean,
    alertDialogReason?: AlertDialogReasonEnum,
    mapDialog?: boolean
}

export function MapTrack({
    latitude,
    longitude,
    status
}: {
    latitude: string,
    longitude: string,
    status: string
}) {

    const router = useRouter()
    const [progress, setProgress] = useState(false)
    const [open, setOpen] = useState(false)

    // using reducer
    const [state, setState] = useReducer((prevstate: RowActionReducerProps, params: RowActionReducerProps) => {
        return { ...prevstate, ...params }
    }, {
        alertDialog: false,
        alertDialogReason: AlertDialogReasonEnum.NONE,
        mapDialog: false,
    })

    const handleMapview = () => {
        setState({
            mapDialog: true
        })
    }

    return (
        <>
            <button className="rounded-md border p-2 hover:bg-gray-100" onClick={handleMapview}>
                <span className="sr-only">Map</span>
                <MapPinIcon className="w-5" />
            </button>

            <MapDialog
                open={state.mapDialog!}
                onClose={() => setState({ mapDialog: false })}
                longitude={longitude}
                latitude={latitude}
                status={status}
            />
        </>
    )
}

export function MapHis({
    latitude,
    longitude,
    status
}: {
    latitude: string,
    longitude: string,
    status: string
}) {

    const router = useRouter()
    const [progress, setProgress] = useState(false)
    const [open, setOpen] = useState(false)

    // using reducer
    const [state, setState] = useReducer((prevstate: RowActionReducerProps, params: RowActionReducerProps) => {
        return { ...prevstate, ...params }
    }, {
        alertDialog: false,
        alertDialogReason: AlertDialogReasonEnum.NONE,
        mapDialog: false,
    })

    const handleMapview = () => {
        setState({
            mapDialog: true
        })
    }

    return (
        <>
            <button className="rounded-md border p-2 hover:bg-gray-100" onClick={handleMapview}>
                <span className="sr-only">Map</span>
                <MapIcon className="w-5" />
            </button>

            <MapDialog
                open={state.mapDialog!}
                onClose={() => setState({ mapDialog: false })}
                longitude={longitude}
                latitude={latitude}
                status={status}
            />
        </>
    )
}