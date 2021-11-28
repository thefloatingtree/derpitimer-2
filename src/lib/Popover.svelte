<script>
    import { fade, fly } from "svelte/transition";
    import clickOutside from "svelte-outside-click";
    
    export let arrow = true;
    export let width = null;

    let open = false;

    export const close = () => {
        open = false;
    }
</script>

<div
    class="relative inline-block text-left"
    on:keydown={(e) => {
        if (e.code === "Escape" || e.code === "Enter") open = false;
    }}
    use:clickOutside={close}
>
    <div on:click={() => (open = !open)}>
        <slot />
    </div>
    <div class="w-full">
        {#if open}
            <div
                in:fly={{ y: 10, duration: 200 }}
                out:fade={{ duration: 100 }}
                style="width: {width}px"
                class="origin-top-right absolute right-0 mt-2 min-w-10 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50 focus:ring-4 focus:ring-blue-500"
            >
                {#if arrow}
                    <div class="absolute -top-1 right-1/2">
                        <div class="rotate-45 bg-white w-3 h-3 rounded-sm" />
                    </div>
                {/if}
                <div class="p-3 w-full" role="none">
                    <slot name="popover" />
                </div>
            </div>
        {/if}
    </div>
</div>
