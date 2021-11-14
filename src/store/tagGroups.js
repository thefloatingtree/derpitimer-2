import { writable } from "svelte/store";
import { persist, localStorage } from "@macfja/svelte-persistent-store"

const DEFAULT_GROUPS = [
    { name: "Just Twilight Screencaps", tags: "twilight sparkle, screencap, solo", sortOrder: "Random" },
    { name: "Just Rainbow Dash Screencaps", tags: "rainbow dash, screencap, solo", sortOrder: "Score" },
    { name: "Just Izzy Screencaps", tags: "izzy moonbow, screencap, solo", sortOrder: "Score" },
]

export const tagGroups = persist(writable(DEFAULT_GROUPS), localStorage(), 'tagGroups')