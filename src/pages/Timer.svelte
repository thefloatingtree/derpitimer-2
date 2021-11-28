<script>
    import { currentPage, images, nextPageURL, totalImages } from "../store/images";
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
    $: noMoreImages = $totalImages === $images.length && $images.length === currentImageIndex + 1;

    $: currentImage = $images[currentImageIndex] || {};
    $: derpiSourceUrl = `https://derpibooru.org/images/${currentImage.id}`;
    $: imageSourceUrl = currentImage.source_url;

    $: {
        imageLoading = true;
        if (currentImage?.representations?.large) {
            console.log("ran");
            loadImage(currentImage.representations.large).then(() => {
                imageLoading = false;
                timerDisplay?.stop();
                timerDisplay?.reset();
                timerDisplay?.start();
            });
        }
    }

    $: {
        console.log(noMoreImages)
        console.log($totalImages, $images.length, currentImageIndex)
    }

    $: {
        currentImageIndex;
        timerDisplay?.stop();
        timerDisplay?.reset();

        if (currentImageIndex === $images.length - 5 && $totalImages > $images.length) {
            currentPage.update(v => v + 1)
            fetch($nextPageURL)
                .then(res => res.json())
                .then(res => {
                    images.update(v => [...v, ...res.images])
                })
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
        <Button color="gray" on:click={() => navigate("/")}>Home</Button>
        <Button
            color="gray"
            on:click={() =>
                timerDisplayPlaying
                    ? timerDisplay.stop()
                    : timerDisplay.start()}
            >{timerDisplayPlaying ? "Pause" : "Play"}</Button
        >
        <Button
            color="gray"
            on:click={() => {
                if (currentImageIndex) currentImageIndex -= 1;
            }}>Previous</Button
        >
        <Button color="gray" on:click={() => {
            if (!noMoreImages) currentImageIndex += 1
            }}
            >Next</Button
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
                    <p class="text-white font-semibold animate-pulse">Loading image</p>
                </div>
            {/if}
        {/key}
    </div>
</div>
