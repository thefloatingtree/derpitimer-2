<script>
    let groups = [ 1, 2, 3, 4, 5 ];
</script>

<div class="space-y-3 pb-12">
    {#if groups.length === 0 }
        <p class="text-gray-light">No tag groups available</p>
    {/if}
    {#each groups as group}
        <div
            class="bg-background-light p-6 rounded-lg flex justify-between items-center"
        >
            <div>
                <h5 class="font-bold text-gray-light">Group Name</h5>
                <p class="text-gray-light">Tag 1, Tag 2, Tag 3, Tag 4</p>
            </div>
            <div class="flex space-x-3">
                <button
                    class="transition-all ease-out duration-150 p-3 hover:bg-white hover:bg-opacity-10 rounded-lg cursor-pointer"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6 text-gray-light"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                    </svg>
                </button>
                <button
                    class="transition-all ease-out duration-150 p-3 hover:bg-white hover:bg-opacity-10 rounded-lg cursor-pointer"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6 text-gray-light"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 4v16m8-8H4"
                        />
                    </svg>
                </button>
            </div>
        </div>
    {/each}
</div>
