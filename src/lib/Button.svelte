<script>
    export let text = "Button";
</script>

<button
    on:click
    class="transition-all ease-out duration-300 h-12 py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500"
>
    {text}
</button>