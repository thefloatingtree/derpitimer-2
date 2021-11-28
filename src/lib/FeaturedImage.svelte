<script>
    import { fade } from "svelte/transition";
    import { cubicOut } from "svelte/easing";
    import Button from "./Button.svelte";

    import loadImage from "image-promise";
import notifications from "../store/notifications";

    let src;
    let imageSourceUrl;
    let derpiSourceUrl;
    let isLoading = true;

    let useStaticFeaturedImage = true;

    fetch("https://derpibooru.org/api/v1/json/images/featured")
        .then((res) => res.json())
        .then((res) => {
            src = res.image.representations.full;
            imageSourceUrl = res.image.source_url;
            derpiSourceUrl = `https://derpibooru.org/images/${res.image.id}`;

            if (useStaticFeaturedImage) {
                src = "https://derpicdn.net/img/2018/12/24/1917683/full.jpg";
                imageSourceUrl = "https://www.deviantart.com/jowybean/art/Cozy-778064075";
                derpiSourceUrl = "https://derpibooru.org/images/1917683";
            }

            loadImage(res.image.representations.full).then(
                () => (isLoading = false)
            );
        });
</script>

{#if !isLoading}
    <div class="h-full grid">
        <img
            in:fade={{ easing: cubicOut, duration: 500 }}
            on:outroend
            {src}
            alt="featured from derpibooru"
            class="m-auto max-w-full max-h-100vh rounded-lg scale-95 shadow-lg"
        />
    </div>
    <div class="absolute bottom-0 right-0 m-3">
        <div class="flex space-x-3">
            <Button
                on:click={() => {
                    window.open(derpiSourceUrl, "_blank");
                }}
            >
                <span class="pr-3">Derpibooru</span>
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
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                </svg>
            </Button>
            {#if imageSourceUrl}
                <Button
                    on:click={() => {
                        window.open(imageSourceUrl, "_blank");
                    }}
                >
                    <span class="pr-3">Source</span>
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
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                    </svg>
                </Button>
            {/if}
        </div>
    </div>
{/if}
{#if isLoading}
    
    <div
        class="absolute bottom-0 right-0 m-3"
    >
    <Button on:click={() => { notifications.addNotification("✨🐴✨") }} color="gray">
        Loading Featured Image...
    </Button>
    </div>
{/if}
