import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import Map from '../map'

// 43.6425662,-79.3870568
function MapDialog({
    open,
    onClose,
    latitude,
    longitude,
    status
}: {
    open: boolean,
    onClose: () => void,
    latitude: string,
    longitude: string
    status: string
}) {

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>MapView</DialogTitle>
                </DialogHeader>
                <Map latitude={latitude} longitude={longitude} status={status} />
            </DialogContent>
        </Dialog>

    )
}

export default MapDialog