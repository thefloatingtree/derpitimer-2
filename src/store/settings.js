import { persist, localStorage } from "@macfja/svelte-persistent-store"
import { writable } from "svelte/store";

export const tags = persist(writable(""), localStorage(), 'tags')
export const newTagGroupName = writable("")
export const sortOrder = persist(writable("Score"), localStorage(), 'sortOrder')
export const timeInterval = persist(writable(60), localStorage(), 'timeInterval')
export const timeIntervalUnit = persist(writable("Seconds"), localStorage(), 'timeIntervalUnit')