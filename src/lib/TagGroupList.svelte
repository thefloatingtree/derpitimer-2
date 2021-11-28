<script>
    import { fade } from "svelte/transition";
    import { cubicOut } from "svelte/easing";
    import { minimumScore, sortOrder, tags } from "../store/settings";
    import { tagGroups } from "../store/tagGroups";
    import Button from "./Button.svelte";

    let shouldAnimate = false
    $: animate = (node, args) => shouldAnimate ? fade(node, args) : null;

    const onTagGroupAdd = (group) => {
        tags.set(group.tags);
        sortOrder.set(group.sortOrder);
        minimumScore.set(group.minimumScore);
    };

    const onTagGroupDelete = (group) => {
        shouldAnimate = true;
        tagGroups.update(tags => {
            return tags.filter(g => g.name != group.name)
        })
    };
</script>

<div class="space-y-3 pb-12 h-full">
    {#each $tagGroups as group (group.name)}
        <div
            on:outroend={() => shouldAnimate = false}
            out:animate={{ easing: cubicOut, duration: 250 }}
            on:click={() => onTagGroupAdd(group)}
            class="transition-all ease-in-out duration-300 bg-background-light p-3 pl-6 rounded-lg flex justify-between items-center space-x-3 cursor-pointer hover:bg-blue-200 hover:bg-opacity-20 {$tags +
                $sortOrder + $minimumScore ==
            group.tags + group.sortOrder + group.minimumScore
                ? 'ring-4 ring-blue-500 scale-101 bg-blue-200 bg-opacity-20'
                : ''}"
        >
            <div>
                <h5 class="text-white font-semibold">
                    {group.name}
                </h5>
                <p class="text-gray-light font-normal font-mono">
                    {group.sortOrder}, Minimum Score: {group.minimumScore}
                </p>
                <p class="text-gray-light">{group.tags}</p>
            </div>
            <div class="flex flex-col space-y-1">
                <Button
                    on:click={() => onTagGroupDelete(group)}
                    color="transparent"
                    iconOnly
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
                </Button>
            </div>
        </div>
    {/each}
    {#if $tagGroups.length === 0}
        <p in:fade={{ easing: cubicOut, duration: 250, delay: 350 }} class="text-gray-light">No tag groups available</p>
    {/if}
</div>
