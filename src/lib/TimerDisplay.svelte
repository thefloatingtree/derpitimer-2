<script>
    import { timeInterval, timeIntervalUnit } from "../store/settings";
    import { createEventDispatcher, onDestroy } from "svelte";

    const dispatch = createEventDispatcher();
    
    const unitLUT = {
        Seconds: 1,
        Minutes: 60,
        Hours: 3600,
    };
    
    let interval;
    const timeInSeconds = parseInt($timeInterval) * unitLUT[$timeIntervalUnit];
    let timeRemainingInSeconds = timeInSeconds;

    export let playing = false;
    export let progress = 0;

    $: seconds = timeRemainingInSeconds % 60;
    $: minutes = Math.floor(timeRemainingInSeconds / 60) % 60;
    $: hours = Math.floor(timeRemainingInSeconds / 60 / 60) % 24;
    $: days = Math.floor(timeRemainingInSeconds / 60 / 60 / 24);
    $: progress = timeRemainingInSeconds / timeInSeconds;

    export function start() {
        playing = true;
        interval = setInterval(() => {
            if (timeRemainingInSeconds > 0) { 
                timeRemainingInSeconds -= 1; 
            } else {
                stop();
                dispatch("finished");
            }
        }, 1000);
    }

    export function stop() {
        playing = false;
        clearInterval(interval);
    }

    export function reset() {
        timeRemainingInSeconds = timeInSeconds;
    }

    onDestroy(() => {
        clearInterval(interval);
    });
</script>

{#if days}
    <span class="pr-1">{days}d</span>
{/if}
{#if hours || days}
    <span class="pr-1">{hours}h</span>
{/if}
{#if minutes || hours || days}
    <span class="pr-1">{minutes}m</span>
{/if}
{seconds}s
