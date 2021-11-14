<script>
    import { fade, fly } from "svelte/transition";
    import clickOutside from "svelte-outside-click";
    import Button from "./Button.svelte";

    export let items = [];
    export let fullWidth = false;

    let open = false;
    export let value = items[0] ? items[0] : "Dropdown";
</script>

<div class="relative inline-block text-left" use:clickOutside={() => {
    open = false;
}}>
    <div
        
    >
        <Button
            on:click={() => {
                open = !open;
            }}
            on:keydown={(e) => {
                if (open) e.preventDefault();
                const index = items.findIndex((item) => item === value);
                if (
                    e.code === "Escape" ||
                    e.code === "Space" ||
                    e.code === "Enter"
                )
                    open = false;
                if (open && (e.code === "ArrowUp" || e.code === "ArrowLeft"))
                    value = items[(index - 1 + items.length) % items.length];
                if (
                    open &&
                    (e.code === "ArrowDown" ||
                        e.code === "ArrowRight" ||
                        e.code === "Tab")
                )
                    value = items[(index + 1) % items.length];
            }}
            {fullWidth}
            color="white"
        >
            <div class="flex items-center justify-between w-full">
                <span>{value}</span>
                <svg
                    class="-mr-1 ml-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                    />
                </svg>
            </div>
        </Button>
    </div>

    {#if open}
        <div
            in:fly={{ y: 10, duration: 200 }}
            out:fade={{ duration: 100 }}
            class="origin-top-right absolute right-0 mt-2 w-full min-w-10 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabindex="-1"
        >
            <div class="space-y-1 py-3 w-full" role="none">
                {#each items as item}
                    <div
                        on:click={() => {
                            value = item;
                            setTimeout(() => open = false, 125)
                        }}
                        class:bg-blue-500={value === item}
                        class:text-white={value === item}
                        class:hover:bg-blue-600={value === item}
                        class="px-4 py-2 mx-3 rounded-md cursor-pointer hover:bg-gray-200 transition-all"
                        role="menuitem"
                        tabindex="-1"
                        id="menu-item-0"
                    >
                        {item}
                    </div>
                {/each}
            </div>
        </div>
    {/if}
</div>
