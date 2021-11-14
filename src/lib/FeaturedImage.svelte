<script>
    import { fade } from "svelte/transition";
    import { cubicOut } from "svelte/easing";
    import Button from "./Button.svelte";

    import loadImage from 'image-promise';

    let src;
    let imageSourceUrl;
    let derpiSourceUrl;
    let isLoading = true;

    fetch("https://derpibooru.org/api/v1/json/images/featured")
        .then((res) => res.json())
        .then((res) => {
            src = res.image.representations.full;
            imageSourceUrl = res.image.source_url;
            derpiSourceUrl = `https://derpibooru.org/images/${res.image.id}`;

            loadImage(res.image.representations.full).then(() => isLoading = false);
        });
</script>

{#if !isLoading}
    <img
        in:fade={{ easing: cubicOut, duration: 500 }}
        on:outroend
        {src}
        alt="featured from derpibooru"
        class="object-cover w-full h-full overflow-hidden select-none pointer-events-none"
    />
    <div class="absolute bottom-0 right-0 m-3">
        <div class="flex space-x-3">
            <Button
                on:click={() => {
                    window.open(derpiSourceUrl, "_blank");
                }}
            >Visit on Derpi</Button>
            <Button
                on:click={() => {
                    window.open(imageSourceUrl, "_blank");
                }}
            >Source</Button>
        </div>
    </div>
{/if}
{#if isLoading}
    <div
        class="absolute bottom-0 right-0 p-3 m-3 text-white bg-background rounded-md"
    >
        Loading Featured Image...
    </div>
{/if}
