<script>
    import { images } from "../store/images";
    import { fade } from "svelte/transition";
    import { cubicOut } from "svelte/easing";

    import Button from "../lib/Button.svelte";

    import TimerDisplay from "../lib/TimerDisplay.svelte";
    import { navigate } from "svelte-routing";
    import { onMount } from "svelte";

    onMount(() => {
        if ($images.length === 0) {
            navigate("/", { replace: true });
        }
        timerDisplay.start();
    });

    let currentImageIndex = 0;

    $: currentImage = $images[currentImageIndex] || {};
    $: derpiSourceUrl = `https://derpibooru.org/images/${currentImage.id}`;
    $: imageSourceUrl = currentImage.source_url;

    $: {
        timerDisplay?.stop();
        timerDisplay?.reset();
        timerDisplay?.start();
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
                    currentImageIndex += 1;
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
        <Button color="gray" on:click={() => (currentImageIndex += 1)}
            >Next</Button
        >
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
            <img
                in:fade={{ easing: cubicOut, duration: 500 }}
                class="m-auto max-w-full max-h-100vh rounded-lg scale-95"
                src={currentImage?.representations?.large}
                alt="test"
            />
        {/key}
    </div>
</div>
