import { writable } from "svelte/store";
import { persist, localStorage } from "@macfja/svelte-persistent-store"

export const DEFAULT_GROUPS = [
    {
        name: "Solo Screencaps",
        tags: "screencap, solo, pony",
        sortOrder: "Random",
        minimumScore: "100",
        id: "DEFAULT-0"
    },
    {
        name: "Just Rainbow Dash Screencaps",
        tags: "rainbow dash, screencap, solo, pony",
        sortOrder: "Random",
        minimumScore: "100",
        id: "DEFAULT-1"
    },
    {
        name: "Highly Rated Solo",
        tags: "solo, pony",
        sortOrder: "Random",
        minimumScore: "1000",
        id: "DEFAULT-2"
    },
]

export const tagGroups = persist(writable(DEFAULT_GROUPS), localStorage(), 'tagGroups')