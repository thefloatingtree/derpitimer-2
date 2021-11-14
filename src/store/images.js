import { writable, derived } from "svelte/store";
import { sortOrder, tags } from "./settings";

export const images = writable([])
export const currentPage = writable(1)

export const nextPageURL = derived([currentPage, tags, sortOrder], ([$currentPage, $tags, $sortOrder], set) => {
    let url = "https://derpibooru.org/api/v1/json/search/images"
    url += $tags ? `?q=${$tags}` + ",safe" : ""
    url += $sortOrder ? `&sf=${$sortOrder.toLowerCase()}` : ""
    url += `&page=${$currentPage}`
    set(url)
})