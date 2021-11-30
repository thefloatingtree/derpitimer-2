<script>
    // @ts-nocheck

    import { onMount } from "svelte";
    import { autoresize } from "svelte-textarea-autoresize";

    export let value = "";
    export let color = "white";

    function updateTextareaValue() {
        if (!textarea) return;
        textarea.value = value.replace(/-/g, "‑");
        textarea.dispatchEvent(new Event('input')); // Trigger textarea growth after value is set
    }

    onMount(() => {
        updateTextareaValue();
    });

    let textarea;

    const colors = {
        white: "border-gray-200 border-2",
        gray: "bg-background-light text-white focus:bg-white focus:bg-opacity-20",
    };

    $: {
        value
        updateTextareaValue();
    }
</script>

<textarea
    class="transition-shadow duration-300 ease-out w-full py-3 px-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 resize-none overflow-hidden {colors[color]}"
    bind:this={textarea}
    on:input={(e) => {
        value = e.target.value.replace(/‑/g, "-");
        e.target.value = e.target.value.replace(/-/g, "‑");
    }}
    use:autoresize
/>