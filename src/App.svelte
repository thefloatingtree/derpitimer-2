<script>
  import Notifications from "./lib/Notifications.svelte";
  import Settings from "./pages/Settings.svelte";
  import Timer from "./pages/Timer.svelte";

  const SETTINGS_PAGE = 1;
  const TIMER_PAGE = 2;

  let page = SETTINGS_PAGE;
  let transitionPlaying = false;
</script>

<main>
  <Notifications />
  {#if page === SETTINGS_PAGE && !transitionPlaying}
    <Settings
      goToTimer={() => {
        page = TIMER_PAGE;
        transitionPlaying = true;
      }}
      on:outroend={() => {
        transitionPlaying = false;
      }}
    />
  {/if}

  {#if page === TIMER_PAGE && !transitionPlaying}
    <Timer />
  {/if}
</main>
