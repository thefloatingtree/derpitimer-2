<script>
    import { images } from "../store/images";
    import { fade } from "svelte/transition";
    import { cubicOut } from "svelte/easing";

    import loadImage from "image-promise";
    import Button from "./Button.svelte";
    import { tags } from "../store/settings";

    export let onBack = () => {};

    const imageURLs = $images.map((image) => image.representations.medium);
    let isLoaded = false;

    loadImage(imageURLs)
        .then(() => (isLoaded = true))
        .catch(() => {});
</script>

<div class="space-y-6">
    <Button on:click={onBack} fullWidth>Back</Button>
    {#if !$images.length}
        <div class="flex flex-col h-full w-full items-center align-bottom">
            <p class="text-white font-semibold">There are no results for</p>
            <p class="text-gray-light font-normal">
                {$tags}
            </p>
        </div>
    {/if}
    <div class="space-y-3">
        {#if isLoaded && $images.length}
            <div class="flex space-x-3">
                <Button on:click={onBack} fullWidth color="gray"
                    >Previous Page</Button
                >
                <Button on:click={onBack} fullWidth color="gray"
                    >Next Page</Button
                >
            </div>
            {#each $images as image}
                <img
                    in:fade={{ easing: cubicOut, duration: 500 }}
                    class="w-full rounded-lg"
                    src={image.representations.medium}
                    alt="preview"
                />
            {/each}
            <div class="flex space-x-3">
                <Button on:click={onBack} fullWidth color="gray"
                    >Previous Page</Button
                >
                <Button on:click={onBack} fullWidth color="gray"
                    >Next Page</Button
                >
            </div>
        {/if}
    </div>
    <div class="pb-6" />
</div>
