<script>
    export let disabled = false;
    export let loading = false;
    export let fullWidth = false;
    export let iconOnly = false;
    export let color = 'blue';

    const colors = {
        blue: "text-white bg-blue-500 focus:ring-blue-500 hover:bg-blue-700 shadow-md",
        purple: "text-white bg-purple-500 focus:ring-purple-500 hover:bg-purple-700 shadow-md",
        gray: "text-white bg-background-light focus:ring-background-light hover:bg-white hover:bg-opacity-20 shadow-md",
        white: "bg-white text-black focus:ring-blue-500 hover:bg-gray-200 shadow-md",
        transparent: "text-white bg-opacity-0 hover:bg-white hover:bg-opacity-20 shadow-none focus:ring-white focus:ring-opacity-20",
    }
</script>

<button
    on:click
    on:keydown
    {disabled}
    class:w-full={fullWidth}
    class:justify-center={fullWidth || iconOnly}
    class:px-2={iconOnly}
    class:w-12={iconOnly}
    class:px-4={!iconOnly}
    class="flex items-center transition-all ease-out duration-300 h-12 py-2 font-semibold rounded-lg focus:outline-none focus:ring-4 whitespace-nowrap {colors[color]}"
>
    {#if loading}
        <svg
            class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
            />
            <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
        </svg>
    {/if}
    <slot></slot>
</button>
