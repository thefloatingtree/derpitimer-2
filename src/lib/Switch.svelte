<script>
    export let active = false;
</script>

<div class:bg-blue-500={active} class:bg-gray-300={!active} class="w-10 h-6 rounded-full flex-shrink-0 p-1 cursor-pointer transition-all" on:click={() => active = !active}>
    <div class:translate-x-4={active} class="bg-white w-4 h-4 rounded-full shadow-md transform transition-all"></div>
</div>