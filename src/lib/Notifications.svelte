<script>
    import { fade, fly } from "svelte/transition";
    import notifictions from "../store/notifications";
</script>

<div class="fixed bottom-0 left-1/2 z-50 space-y-3 pb-3">
    {#each $notifictions as notification}
        <div
            in:fly={{ y: 10, duration: 200 }}
            out:fade={{ duration: 150 }}
            class="bg-red-500 p-3 rounded-lg font-semibold text-white"
        >
            {notification.message}
        </div>
    {/each}
</div>
