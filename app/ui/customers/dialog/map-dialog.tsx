import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import Map from '../map'
import { fetchFilteredLocationTrackingById } from '@/app/lib/select'

// 43.6425662,-79.3870568
function MapDialog({
    open,
    onClose,
    id
}: {
    open: boolean,
    onClose: () => void,
    id: string
}) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>MapView</DialogTitle>
                </DialogHeader>
                <Map id={id} />
            </DialogContent>
        </Dialog>

    )
}

export default MapDialog