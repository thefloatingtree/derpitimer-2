<script>
    import FeaturedImage from "../lib/FeaturedImage.svelte";
    import Button from "../lib/Button.svelte";
    import Dropdown from "../lib/Dropdown.svelte";
    import TagGroupList from "../lib/TagGroupList.svelte";

    export let goToTimer = () => {};
</script>

<div class="bg-background grid grid-cols-12 h-screen">
    <div
        class="col-span-full md:col-span-6 lg:col-span-5 xl:col-span-4 2xl:col-span-3 h-full overflow-y-scroll"
    >
        <div class="p-4 xs:p-6 lg:p-8 h-full flex flex-col gap-6">
            <div class="flex flex-col space-y-6 xs:space-y-0 xs:flex-row justify-between xs:items-center">
                <h1 class="pb-1 text-4xl font-medium text-white">Derpitimer</h1>
                <Button text="Continue" on:click={goToTimer} />
            </div>
            <h2 class="text-3xl text-white">Timer Settings</h2>
            <div class="flex flex-col gap-3">
                <h3 class="text-xl font-medium text-gray-200">Time Interval</h3>
                <div class="flex gap-4">
                    <input
                        type="text"
                        class="transition-all ease-out duration-300 w-full h-12 py-2 px-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500"
                        value="60"
                    />
                    <Dropdown items={["Seconds", "Minutes", "Hours"]} />
                </div>
                <h3 class="text-xl font-medium text-gray-200">Sort Order</h3>
                <Dropdown items={["Random", "Score"]} fullWidth={true} />
            </div>
            <h2 class="text-3xl text-white">Tags</h2>
            <div>
                <input
                    type="text"
                    class="transition-all ease-out duration-300 w-full h-12 py-2 px-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500"
                    placeholder="Search for tags..."
                />
            </div>
            <h2 class="text-3xl text-white">Tag Groups</h2>
            <TagGroupList />
        </div>
    </div>
    <div
        class="hidden md:inline md:col-span-6 lg:col-span-7 xl:col-span-8 2xl:col-span-9 h-full relative overflow-hidden"
    >
        <FeaturedImage on:outroend />
    </div>
</div>
