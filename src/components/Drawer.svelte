<script>
    import { createEventDispatcher } from "svelte";
	import { onMount } from 'svelte';

    import Overlay from "./Overlay.svelte";

    export let isDrawerOpen = false;

    let dispatch = createEventDispatcher();

    export let location = 'bottom';

    const closeDrawer = () => {
        dispatch('closeDrawer');
    }

    onMount(() => {
		if (isDrawerOpen) {
			dispatch('animateImage');
		}
  	});
</script>


<Overlay handleClick={closeDrawer} />

<div class="drawer {location} {isDrawerOpen ? 'bottom-show' : 'bottom-hide'}">
    <div class="action">
        <button on:click={closeDrawer}>Close</button>
    </div>
    <slot></slot>
</div>

<style>
    .drawer {
        position: fixed;
        background-color: #fff;
        color: black;
        z-index: 500;
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content:flex-start;
        transition: bottom 0.3s ease;
        box-shadow: 0px -2px 5px rgba(0, 0, 0, 0.2);
    }

    .action {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        width: 100%;
    }

    .bottom {
        bottom: 0px;
        left: 0;
        border-radius: 10px 10px 0 0;
        max-height: 40vh;
    }

    .bottom-show {
        bottom: 0;
    }

    .bottom-hide {
        bottom: -300px;
    }

    .right {
        top: 0;
        right: 0;
        width: 20vw;
        border-radius: 5px 0 0 5px;
        height: 100vh;
        overflow-y: auto;
    }

    .left {
        top: 0;
        left: 0;
        width: 20vw;
    }

</style>