<script>
    import {
        currentPage,
        images,
        nextPageURL,
        totalImages,
    } from "../store/images";
    import { fade } from "svelte/transition";
    import { cubicOut } from "svelte/easing";

    import Button from "../lib/Button.svelte";

    import TimerDisplay from "../lib/TimerDisplay.svelte";
    import { navigate } from "svelte-routing";
    import { onMount } from "svelte";
    import loadImage from "image-promise";

    onMount(() => {
        if ($images.length === 0) {
            navigate("/", { replace: true });
        }
        timerDisplay.start();
    });

    let currentImageIndex = 0;
    let imageLoading = false;
    $: noMoreImages =
        $totalImages === $images.length &&
        $images.length === currentImageIndex + 1;

    $: currentImage = $images[currentImageIndex] || {};
    $: derpiSourceUrl = `https://derpibooru.org/images/${currentImage.id}`;
    $: imageSourceUrl = currentImage.source_url;

    $: {
        imageLoading = true;
        if (currentImage?.representations?.large) {
            loadImage(currentImage.representations.large).then(() => {
                imageLoading = false;
                timerDisplay?.stop();
                timerDisplay?.reset();
                timerDisplay?.start();
            });
        }
    }

    $: {
        currentImageIndex;
        timerDisplay?.stop();
        timerDisplay?.reset();

        if (
            currentImageIndex === $images.length - 5 &&
            $totalImages > $images.length
        ) {
            currentPage.update((v) => v + 1);
            fetch($nextPageURL)
                .then((res) => res.json())
                .then((res) => {
                    images.update((v) => [...v, ...res.images]);
                });
        }
    }

    let timerDisplay;
    let timerDisplayPlaying;
</script>

<div class="w-screen h-screen bg-background bg-graph-texture">
    <div class="absolute m-3 flex flex-wrap gap-3 z-50">
        <Button color="blue">
            <TimerDisplay
                bind:this={timerDisplay}
                bind:playing={timerDisplayPlaying}
                on:finished={() => {
                    if (!noMoreImages) currentImageIndex += 1;
                }}
            />
        </Button>
        <Button iconOnly color="gray" on:click={() => navigate("/")}
            ><svg
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
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
            </svg></Button
        >
        <Button
            iconOnly
            color="gray"
            on:click={() =>
                timerDisplayPlaying
                    ? timerDisplay.stop()
                    : timerDisplay.start()}
            >
            {#if timerDisplayPlaying}
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
                        d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            {:else}
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
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            {/if}
        </Button>
    </div>
    <div class="absolute bottom-0 left-0 m-3 flex space-x-3">
        <Button
            iconOnly
            color="gray"
            on:click={() => {
                if (currentImageIndex) currentImageIndex -= 1;
            }}
            ><svg
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
                    d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
                />
            </svg></Button
        >
        <Button
            iconOnly
            color="gray"
            on:click={() => {
                if (!noMoreImages) currentImageIndex += 1;
            }}
            ><svg
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
                    d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg></Button
        >
    </div>
    <div class="absolute top-0 right-0 m-3 z-50">
        <Button color="gray">
            {currentImageIndex + 1} of {$totalImages}
        </Button>
    </div>
    <div class="absolute bottom-0 right-0 m-3 z-50">
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
    <div class="h-full grid">
        {#key currentImageIndex}
            {#if !imageLoading}
                <img
                    in:fade={{ easing: cubicOut, duration: 500 }}
                    class="m-auto max-w-full max-h-100vh rounded-lg scale-95"
                    src={currentImage?.representations?.large}
                    alt="test"
                />
            {:else}
                <div class="m-auto max-w-full max-h-100vh text-center">
                    <p class="text-white font-semibold animate-pulse">
                        Loading image
                    </p>
                </div>
            {/if}
        {/key}
    </div>
</div>
