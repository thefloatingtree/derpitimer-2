<script>
    import { fade, fly } from "svelte/transition";
    import notifictions from "../store/notifications";

    const colors = {
        "red": "bg-red-500 text-white",
        "blue": "bg-blue-500 text-white",
        "white": "bg-white text-background",
    }
</script>

<div class="fixed bottom-0 left-1/2 z-50 space-y-3 pb-3">
    {#each $notifictions as notification}
        <div
            in:fly={{ y: 10, duration: 200 }}
            out:fade={{ duration: 150 }}
            class="p-3 rounded-lg font-semibold {colors[notification.color]}"
        >
            {notification.message}
        </div>
    {/each}
</div>
