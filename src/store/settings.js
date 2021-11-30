import { persist, localStorage } from "@macfja/svelte-persistent-store"
import { writable } from "svelte/store";

export const DEFAULT_GLOBAL_TAGS = "safe, -animated, -edited screencap, -meme, -edit, -text, -butt, -cosplay"

export const tags = persist(writable(""), localStorage(), 'tags')
export const newTagGroupName = writable("")
export const sortOrder = persist(writable("Score"), localStorage(), 'sortOrder')
export const minimumScore = persist(writable("100"), localStorage(), 'minimumScore')
export const globalTags = persist(writable(DEFAULT_GLOBAL_TAGS), localStorage(), "globalTags")
export const timeInterval = persist(writable("1"), localStorage(), 'timeInterval')
export const timeIntervalUnit = persist(writable("Minutes"), localStorage(), 'timeIntervalUnit')

// https://stackoverflow.com/questions/175739/how-can-i-check-if-a-string-is-a-valid-number
function isNumeric(str) {
    if (typeof str != "string") return false
    return !isNaN(+str) && !isNaN(parseFloat(str))
}

function forceInteger(value, store) {
    value = String(value)
    if (value.includes('.') || value.includes('-')) {
        store.set(value.replace('.', ''))
        store.set(value.replace('-', ''))
    }
    if (value.length > 10 || !isNumeric(value)) {
        store.set(value.substring(0, value.length - 1))
    }
}

timeInterval.subscribe(value => {
    forceInteger(value, timeInterval)
})

minimumScore.subscribe(value => {
    forceInteger(value, minimumScore)
})