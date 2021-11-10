<script>
    import { fade, fly } from "svelte/transition";
    import clickOutside from "svelte-outside-click";
    export let items = [];
    export let fullWidth = false;

    let active = false;
    let selectedItem = items[0] ? items[0] : "Dropdown";
</script>

<div class="relative inline-block text-left">
    <button
        on:click={() => {
            active = !active;
        }}
        on:keyup={(e) => {
            const index = items.findIndex((item) => item === selectedItem);
            if (e.code === "Escape") active = false;
            if (e.code === "ArrowUp" || e.code === "ArrowLeft")
                selectedItem = items[(index - 1 + items.length) % items.length];
            if (e.code === "ArrowDown" || e.code === "ArrowRight")
                selectedItem = items[(index + 1) % items.length];
        }}
        use:clickOutside={() => {
            active = false;
        }}
        type="button"
        class:w-full={fullWidth}
        class:justify-between={fullWidth}
        class="transition-all ease-out duration-300 inline-flex justify-center items-center rounded-lg shadow-sm h-12 py-2 px-4 bg-white font-semibold text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-blue-500"
        id="menu-button"
        aria-expanded="true"
        aria-haspopup="true"
    >
        {selectedItem}
        <!-- Heroicon name: solid/chevron-down -->
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
    </button>

    {#if active}
        <div
            in:fly={{ y: 10, duration: 200 }}
            out:fade={{ duration: 100 }}
            class="origin-top-right absolute right-0 mt-2 w-56 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabindex="-1"
        >
            <div class="py-1" role="none">
                {#each items as item}
                    <div
                        on:click={() => {
                            selectedItem = item;
                        }}
                        class:bg-blue-500={selectedItem === item}
                        class:text-white={selectedItem === item}
                        class:hover:bg-blue-600={selectedItem === item}
                        class="block px-4 py-2 text-sm cursor-pointer hover:bg-gray-200 transition-all"
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
