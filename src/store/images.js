import { writable, derived } from "svelte/store";
import { explicitImages, globalTags, minimumScore, sortOrder, tags } from "./settings";

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

export const nextPageURL = derived([currentPage, tags, sortOrder, globalTags, minimumScore, randomSortSeed, explicitImages], ([$currentPage, $tags, $sortOrder, $globalTags, $minimumScore, $randomSortSeed, $explicitImages], set) => {
    let url = "https://derpibooru.org/api/v1/json/search/images"
    url += $tags ? "?q=" + cleanTags($tags + "," + $globalTags + ",score.gte:" + $minimumScore + (explicitImages ? "" : ",safe")) : ""
    url += $sortOrder ? `&sf=${$sortOrder.toLowerCase()}:${$randomSortSeed}` : ""
    url += `&page=${$currentPage + 1}`
    url += ($explicitImages ? "&filter_id=56027" : "")

    set(url)
})