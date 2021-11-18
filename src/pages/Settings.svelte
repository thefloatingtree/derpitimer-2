<script>
    import { navigate } from "svelte-routing";
    import FeaturedImage from "../lib/FeaturedImage.svelte";
    import Button from "../lib/Button.svelte";
    import Dropdown from "../lib/Dropdown.svelte";
    import TagGroupList from "../lib/TagGroupList.svelte";

    import { fade } from "svelte/transition";
    import { cubicOut } from "svelte/easing";

    import {
        newTagGroupName,
        sortOrder,
        tags,
        timeInterval,
        timeIntervalUnit,
    } from "../store/settings";
    import {
        currentPage,
        images,
        nextPageURL,
        totalImages,
    } from "../store/images";
    import PreviewList from "../lib/PreviewList.svelte";
    import Popover from "../lib/Popover.svelte";
    import { tagGroups } from "../store/tagGroups";
    import notifictions from "../store/notifications";
    import TimerDisplay from "../lib/TimerDisplay.svelte";

    let continueDisabled = false;
    let showPreview = false;
    let previewLoading = false;
    let lastPreviewURL;

    const onContinue = () => {
        if (!$tags)
            return notifictions.addNotification(
                "Tag list is empty, try adding some tags!"
            );
        if (!$timeInterval)
            return notifictions.addNotification(
                "Time interval is empty"
            )

        continueDisabled = true;
        fetch($nextPageURL)
            .then((res) => res.json())
            .then((res) => {
                totalImages.set(res.total);
                currentPage.set(1);
                images.set(res.images);
                continueDisabled = false;
                currentPage.update(
                    (v) => (v + 1) % Math.floor($totalImages / 15)
                );
                navigate("timer");
            });
    };

    const onPreview = () => {
        if (!$tags)
            return notifictions.addNotification(
                "Tag list is empty, try adding some tags!"
            );
        if ($nextPageURL === lastPreviewURL) return (showPreview = true);

        previewLoading = true;
        fetch($nextPageURL)
            .then((res) => res.json())
            .then((res) => {
                totalImages.set(res.total);
                lastPreviewURL = $nextPageURL;
                images.set(res.images);
                previewLoading = false;
                showPreview = true;
            });
    };

    const makeTagGroup = () => {
        if (!$tags)
            return notifictions.addNotification(
                "Tag list is empty, try adding some tags!"
            );
        if (!$newTagGroupName)
            return notifictions.addNotification("Group name is empty");

        tagGroups.update((groups) => {
            const filteredGroups = groups.filter(
                (g) => g.name != $newTagGroupName
            );
            return [
                { name: $newTagGroupName, tags: $tags, sortOrder: $sortOrder },
                ...filteredGroups,
            ];
        });
    };
</script>

<div class="bg-background grid grid-cols-12 h-screen">
    <div
        class="col-span-full md:col-span-6 lg:col-span-5 xl:col-span-4 2xl:col-span-3 h-full overflow-y-scroll"
    >
        <div class="p-4 xs:p-6 lg:p-8 h-full">
            {#if !showPreview}
                <div
                    class="flex flex-col space-y-6"
                    in:fade={{ easing: cubicOut, duration: 300 }}
                >
                    <div class="space-y-3">
                        <p class="text-4xl font-semibold text-white py-3">
                            Derpitimer
                        </p>
                        <div class="flex items-stretch space-x-3">
                            <Button
                                on:click={onPreview}
                                loading={previewLoading}
                                fullWidth
                                color="purple">Preview</Button
                            >
                            <Button
                                on:click={onContinue}
                                disabled={continueDisabled}
                                loading={continueDisabled}
                                fullWidth>Start</Button
                            >
                        </div>
                    </div>
                    <h2 class="text-2xl font-semibold text-white">
                        Timer Settings
                    </h2>
                    <div class="flex flex-col space-y-1">
                        <h3 class="text-white opacity-75 font-semibold">
                            Time Interval
                        </h3>
                        <div class="flex space-x-3">
                            <input
                                type="text"
                                class="transition-all ease-out duration-300 bg-background-light text-white focus:bg-white focus:bg-opacity-20 w-full h-12 py-2 px-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500"
                                bind:value={$timeInterval}
                            />
                            <Dropdown
                                items={["Seconds", "Minutes", "Hours"]}
                                color="gray"
                                bind:value={$timeIntervalUnit}
                            />
                        </div>
                    </div>
                    <h2 class="text-2xl font-semibold text-white">Tags</h2>
                    <div class="flex flex-col space-y-3">
                        <h3 class="text-white opacity-75 font-semibold">
                            Tag List
                        </h3>
                        <input
                            type="text"
                            class="transition-all bg-background-light text-white focus:bg-white focus:bg-opacity-20 ease-out duration-300 w-full h-12 py-2 px-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500"
                            placeholder="twilight sparkle, cute"
                            bind:value={$tags}
                        />
                        <h3 class="text-white opacity-75 font-semibold">
                            Sort Order
                        </h3>
                        <Dropdown
                            items={["Score", "Random", "Upvotes", "ID"]}
                            color="gray"
                            fullWidth
                            bind:value={$sortOrder}
                        />
                        <Popover>
                            <Button fullWidth color="gray">Make Group</Button>
                            <div slot="popover" class="p-3 space-y-3 w-full">
                                <input
                                    type="text"
                                    class="transition-all ease-out duration-300 w-full h-12 py-2 px-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 border-gray-200 border-2"
                                    placeholder="Untitled Tag Group"
                                    bind:value={$newTagGroupName}
                                    on:keyup={(e) =>
                                        e.key === "Enter" && makeTagGroup()}
                                />
                                <Button fullWidth on:click={makeTagGroup}
                                    >Make Group</Button
                                >
                            </div>
                        </Popover>
                    </div>
                    <h2 class="text-2xl font-semibold text-white">
                        Tag Groups
                    </h2>
                    <TagGroupList />
                </div>
            {:else}
                <div
                    class="space-y-6"
                    in:fade={{ easing: cubicOut, duration: 300 }}
                >
                    <PreviewList onBack={() => (showPreview = false)} />
                </div>
            {/if}
        </div>
    </div>

    <div
        class="hidden md:inline md:col-span-6 lg:col-span-7 xl:col-span-8 2xl:col-span-9 h-full relative overflow-hidden bg-graph-texture"
    >
        <FeaturedImage on:outroend />
    </div>
</div>
