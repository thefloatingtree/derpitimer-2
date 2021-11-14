<script>
    import loadImage from "image-promise";

    import { fade } from "svelte/transition";
    import { cubicOut } from "svelte/easing";
    import {
        currentPage,
        images,
        nextPageURL,
        totalImages,
    } from "../store/images";
    import { tags } from "../store/settings";

    import Button from "./Button.svelte";
    import Popover from "./Popover.svelte";
    import notifications from "../store/notifications";

    export let onBack = () => {};

    let isLoaded = false;

    const wrapIndex = (i, wrap) => {
        return ((i % wrap) + wrap) % wrap;
    };

    const loadImages = () => {
        const imageURLs = $images.map((image) => image.representations.medium);
        isLoaded = false;
        loadImage(imageURLs)
            .then(() => (isLoaded = true))
            .catch(() => {});
    };

    loadImages();

    const onNext = () => {
        isLoaded = false;
        currentPage.update((v) =>
            wrapIndex(
                v + (wrapIndex(v + 1, Math.floor($totalImages / 15)) ? 1 : 2),
                Math.floor($totalImages / 15)
            )
        );
        fetch($nextPageURL)
            .then((res) => res.json())
            .then((res) => {
                images.set(res.images);
                loadImages();
            });
    };

    const onPrev = () => {
        isLoaded = false;
        currentPage.update((v) =>
            wrapIndex(v - (v - 1 ? 1 : 2), Math.floor($totalImages / 15))
        );
        fetch($nextPageURL)
            .then((res) => res.json())
            .then((res) => {
                images.set(res.images);
                loadImages();
            });
    };
</script>

<div class="space-y-6">
    <Button on:click={onBack} fullWidth>Back</Button>
    {#if !isLoaded}
        <div
            in:fade={{ easing: cubicOut, duration: 500 }}
            class="flex flex-col h-full w-full items-center align-bottom"
        >
            <p class="text-white font-semibold animate-pulse">Loading images</p>
        </div>
    {/if}
    {#if !$images.length}
        <div
            in:fade={{ easing: cubicOut, duration: 500 }}
            class="flex flex-col h-full w-full items-center align-bottom"
        >
            <p class="text-white font-semibold">There are no results for</p>
            <p class="text-gray-light font-normal">
                {$tags}
            </p>
        </div>
    {/if}
    <div class="space-y-3">
        {#if isLoaded && $images.length}
            <div class="flex space-x-3">
                <Button on:click={onPrev} fullWidth color="gray"
                    >Previous Page</Button
                >
                <Button on:click={onNext} fullWidth color="gray"
                    >Next Page</Button
                >
            </div>
            <p
                class="text-white text-center whitespace-nowrap p-3 px-6 bg-background-light rounded-lg"
            >
                {$currentPage * 15} of {$totalImages}
            </p>
            {#each $images as image}
                <div class="relative">
                    {#if image.showTags}
                        <div class="absolute bg-white rounded-lg p-3 text-background overflow-y-auto font-mono bottom-0 m-3 right-16 left-0 top-0">
                            {image.tags.join(', ')}
                        </div>
                    {/if}
                    <div class="absolute m-3 right-0">
                        <Popover bind:this={image.popover} arrow={false}>
                            <Button iconOnly color="gray">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                                    />
                                </svg>
                            </Button>
                            <div slot="popover" class="space-y-1">
                                <button
                                    on:click={() => {
                                        image.popover.close();
                                        image.showTags = !image.showTags;
                                    }}
                                    class="px-4 py-2 w-full text-left rounded-md cursor-pointer hover:bg-gray-200 transition-all"
                                >
                                    {image.showTags ? "Hide" : "Show"} Tags
                                </button>
                                <button
                                    on:click={() => {
                                        image.popover.close();
                                    }}
                                    class="px-4 py-2 w-full text-left rounded-md cursor-pointer hover:bg-gray-200 transition-all"
                                >
                                    Blacklist
                                </button>
                                <button
                                    on:click={() => {
                                        image.popover.close();
                                        window.open(image.source_url, "_blank");
                                    }}
                                    class="px-4 py-2 w-full text-left rounded-md cursor-pointer hover:bg-gray-200 transition-all"
                                >
                                    Source
                                </button>
                                <button
                                    on:click={() => {
                                        image.popover.close();
                                        window.open(
                                            `https://derpibooru.org/images/${image.id}`,
                                            "_blank"
                                        );
                                    }}
                                    class="px-4 py-2 w-full text-left rounded-md cursor-pointer hover:bg-gray-200 transition-all"
                                >
                                    Derpi Link
                                </button>
                            </div>
                        </Popover>
                    </div>
                    <img
                        in:fade={{ easing: cubicOut, duration: 500 }}
                        class="w-full rounded-lg"
                        src={image.representations.medium}
                        alt="preview"
                    />
                </div>
            {/each}
            <p
                class="text-white text-center whitespace-nowrap p-3 px-6 bg-background-light rounded-lg"
            >
                {$currentPage * 15} of {$totalImages}
            </p>
            <div class="flex space-x-3">
                <Button on:click={onPrev} fullWidth color="gray"
                    >Previous Page</Button
                >
                <Button on:click={onNext} fullWidth color="gray"
                    >Next Page</Button
                >
            </div>
        {/if}
    </div>
    <div class="pb-6" />
</div>
