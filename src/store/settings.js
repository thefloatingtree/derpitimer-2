import { persist, localStorage } from "@macfja/svelte-persistent-store"
import { writable } from "svelte/store";

export const tags = persist(writable(""), localStorage(), 'tags')
export const newTagGroupName = writable("")
export const sortOrder = persist(writable("Score"), localStorage(), 'sortOrder')
export const timeInterval = persist(writable("60"), localStorage(), 'timeInterval')
export const timeIntervalUnit = persist(writable("Seconds"), localStorage(), 'timeIntervalUnit')

timeInterval.subscribe(value => {
    if (value.includes('.') || value.includes('-')) {
        timeInterval.set(value.replace('.', ''))
        timeInterval.set(value.replace('-', ''))
    }
    if (value.length > 10 || !parseInt(value)) {
        timeInterval.set(value.substring(0, value.length - 1))
    }
})