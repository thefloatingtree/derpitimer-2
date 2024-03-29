<script>
    import { navigate } from "svelte-routing";
    import FeaturedImage from "../lib/FeaturedImage.svelte";
    import Button from "../lib/Button.svelte";
    import Dropdown from "../lib/Dropdown.svelte";
    import TagGroupList from "../lib/TagGroupList.svelte";

    import { fade } from "svelte/transition";
    import { cubicOut } from "svelte/easing";

    import {
        DEFAULT_GLOBAL_TAGS,
        explicitImages,
        globalTags,
        minimumScore,
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
        randomSortSeed,
        totalImages,
    } from "../store/images";
    import PreviewList from "../lib/PreviewList.svelte";
    import Popover from "../lib/Popover.svelte";
    import { DEFAULT_GROUPS, tagGroups } from "../store/tagGroups";
    import notifictions from "../store/notifications";
    import Switch from "../lib/Switch.svelte";
    import { nanoid } from "nanoid";
    import AutoGrowTextArea from "../lib/AutoGrowTextArea.svelte";

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
            return notifictions.addNotification("Time interval is empty");

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
            return [
                {
                    name: $newTagGroupName,
                    tags: $tags,
                    sortOrder: $sortOrder,
                    minimumScore: $minimumScore,
                    id: nanoid(),
                },
                ...groups,
            ];
        });
    };

    let popoverWidth;
    let popovers = {};

    $: {
        $tags;
        $sortOrder;
        $minimumScore;
        $globalTags;
        $explicitImages;

        currentPage.set(0);
    }
</script>

<div class="bg-background grid grid-cols-12 h-screen">
    <div
        class="col-span-full md:col-span-6 lg:col-span-5 xl:col-span-4 2xl:col-span-3 h-full bg-background md:overflow-y-scroll"
    >
        <div class="p-4 xs:p-6 lg:p-8 h-full">
            {#if !showPreview}
                <div
                    class="flex flex-col space-y-6"
                    in:fade={{ easing: cubicOut, duration: 300 }}
                >
                    <div class="space-y-3">
                        <div
                            bind:clientWidth={popoverWidth}
                            class="flex justify-between items-center"
                        >
                            <p class="text-4xl font-semibold text-white py-3">
                                Derpitimer
                            </p>
                            <div class="flex space-x-3">
                                <Popover
                                    arrow={false}
                                    width={popoverWidth}
                                    height="500"
                                    xOffset="60px"
                                >
                                    <Button color="gray" iconOnly>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </Button>
                                    <div
                                        slot="popover"
                                        class="p-3 space-y-3 w-full"
                                    >
                                        <h2
                                            class="text-background-light-light text-lg font-bold"
                                        >
                                            Help
                                        </h2>
                                        <p>Made by <a href="https://twitter.com/thefloatingtree" class="text-blue-500">@thefloatingtree</a></p>
                                        <h3
                                            class="text-background-light-light font-bold"
                                        >
                                            What is Derpitimer?
                                        </h3>
                                        <p>
                                            A website that helps you do timed
                                            drawing studies, but with ponies!
                                        </p>
                                        <p>
                                            Images are pulled from <a
                                                class="text-blue-500"
                                                href="https://derpibooru.org/"
                                                >derpibooru.org</a
                                            >
                                        </p>
                                        <!-- <p>Originally inspired by <a class="text-blue-500" href="https://line-of-action.com/">https://line-of-action.com/</a></p> -->
                                        <h3
                                            class="text-background-light-light font-bold"
                                        >
                                            How do I use it?
                                        </h3>
                                        <p>
                                            Add derpibooru image tags into the
                                            input labled "Tags". If you don't
                                            know any tags, click on a tag group
                                            to load up example tags. Use a
                                            hyphen (-) to negate a tag.
                                        </p>
                                        <p>
                                            Use the "Preview" button to see what
                                            comes up for your tags. Click on any
                                            image to pull up that image's tags,
                                            use this to narrow down your search
                                            further.
                                        </p>
                                        <p>
                                            Under the settings cog, there are
                                            "Global Tags" which apply to every
                                            image search.
                                        </p>
                                        <p>
                                            Once you feel happy with the list of
                                            images being returned, click the
                                            "Start" button to begin your timed
                                            drawing studies.
                                        </p>
                                    </div>
                                </Popover>
                                <Popover
                                    arrow={false}
                                    width={popoverWidth}
                                >
                                    <div
                                        slot="popover"
                                        class="p-3 space-y-4 w-full"
                                    >
                                        <h2
                                            class="text-background-light-light text-lg font-bold"
                                        >
                                            Settings
                                        </h2>
                                        <div class="space-y-3">
                                            <!-- <div
                                                class="flex justify-between items-center"
                                            >
                                                <h3
                                                    class="text-background-light-light font-bold"
                                                >
                                                    Sound
                                                </h3>
                                                <Switch />
                                            </div> -->
                                            <div
                                                class="flex justify-between items-center"
                                            >
                                                <h3
                                                    class="text-background-light-light font-bold"
                                                >
                                                    Allow Explicit Images
                                                </h3>
                                                <Switch bind:active={$explicitImages} />
                                            </div>
                                        </div>
                                        <div class="space-y-3">
                                            <h3
                                                class="text-background-light-light font-bold"
                                            >
                                                Global Tags
                                            </h3>
                                            <AutoGrowTextArea
                                                bind:value={$globalTags}
                                            />
                                        </div>
                                        <div class="space-y-2">
                                            <Button
                                                fullWidth
                                                on:click={() => {
                                                    randomSortSeed.set(
                                                        Date.now()
                                                    );
                                                    notifictions.addNotification(
                                                        "Randomized! 🎲",
                                                        "blue"
                                                    );
                                                }}
                                                color="gray"
                                                >Re-Randomize Image Order</Button
                                            >
                                            <Button
                                                fullWidth
                                                on:click={() => {
                                                    tagGroups.update(
                                                        (groups) => {
                                                            const deletedDefaults =
                                                                DEFAULT_GROUPS.filter(
                                                                    (group) => {
                                                                        return !groups.find(
                                                                            (
                                                                                g
                                                                            ) =>
                                                                                g.id ===
                                                                                group.id
                                                                        );
                                                                    }
                                                                );
                                                            return [
                                                                ...deletedDefaults,
                                                                ...groups,
                                                            ];
                                                        }
                                                    );
                                                    notifictions.addNotification(
                                                        "Restored defaults! ✨",
                                                        "blue"
                                                    );
                                                }}
                                                color="gray"
                                                >Restore Default Tag Groups</Button
                                            >
                                            <Button
                                                fullWidth
                                                on:click={() => {
                                                    globalTags.set(
                                                        DEFAULT_GLOBAL_TAGS
                                                    );
                                                    notifictions.addNotification(
                                                        "Restored defaults! ✨",
                                                        "blue"
                                                    );
                                                }}
                                                color="gray"
                                                >Restore Default Global Tags</Button
                                            >
                                        </div>
                                    </div>
                                    <Button color="gray" iconOnly>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                            />
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                        </svg>
                                    </Button>
                                </Popover>
                            </div>
                        </div>
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
                        Timer
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
                    <h2 class="text-2xl font-semibold text-white">Search</h2>
                    <div class="flex flex-col space-y-3">
                        <h3 class="text-white opacity-75 font-semibold">
                            Tags
                        </h3>
                        <AutoGrowTextArea
                            bind:value={$tags}
                            placeholder="twilight sparkle, cute . . ."
                            color="gray"
                        />
                        <h3 class="text-white opacity-75 font-semibold">
                            Minimum Score
                        </h3>
                        <input
                            type="text"
                            class="transition-all bg-background-light text-white focus:bg-white focus:bg-opacity-20 ease-out duration-300 w-full h-12 py-2 px-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500"
                            bind:value={$minimumScore}
                        />
                        <h3 class="text-white opacity-75 font-semibold">
                            Sort By
                        </h3>
                        <Dropdown
                            items={["Random", "Score", "Upvotes", "ID"]}
                            color="gray"
                            fullWidth
                            bind:value={$sortOrder}
                        />
                        <Popover
                            bind:this={popovers.makeGroup}
                            width={popoverWidth}
                        >
                            <Button fullWidth color="gray">Make Group</Button>
                            <div slot="popover" class="p-3 space-y-3 w-full">
                                <input
                                    type="text"
                                    class="transition-all ease-out duration-300 w-full h-12 py-2 px-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 border-gray-200 border-2"
                                    placeholder="Untitled Tag Group"
                                    bind:value={$newTagGroupName}
                                    on:keyup={(e) =>
                                        e.key === "Enter" &&
                                        (() => {
                                            makeTagGroup();
                                            popovers.makeGroup.close();
                                        })}
                                />
                                <Button
                                    fullWidth
                                    on:click={() => {
                                        makeTagGroup();
                                        popovers.makeGroup.close();
                                    }}>Make Group</Button
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
