import { writable, derived } from "svelte/store";
import { globalTags, minimumScore, sortOrder, tags } from "./settings";

function cleanTags(tagString) {
    return tagString
        .split(',')
        .filter((tag) => {
            return tag.length
        })
        .map((tag) => {
            return tag.toLowerCase().trim()
        })
        .join(',')
}

export const totalImages = writable(0)
export const images = writable([])
export const currentPage = writable(0)
export const randomSortSeed = writable(Date.now())

export const nextPageURL = derived([currentPage, tags, sortOrder, globalTags, minimumScore, randomSortSeed], ([$currentPage, $tags, $sortOrder, $globalTags, $minimumScore, $randomSortSeed], set) => {
    let url = "https://derpibooru.org/api/v1/json/search/images"
    url += $tags ? "?q=" + cleanTags($tags + "," + $globalTags + ",safe" + ",score.gte:" + $minimumScore) : ""
    url += $sortOrder ? `&sf=${$sortOrder.toLowerCase()}:${$randomSortSeed}` : ""
    url += `&page=${$currentPage + 1}`

    set(url)
})