<script lang="ts">
    import { fly } from 'svelte/transition';
    import { createEventDispatcher } from "svelte";
	// import { onMount } from 'svelte';

    import Overlay from "./Overlay.svelte";

    export let isDrawerOpen = false;

    let dispatch = createEventDispatcher();

    export let location: string = 'bottom';

    const closeDrawer = () => {
        dispatch('closeDrawer');
    }

    // onMount(() => {
	// 	if (isDrawerOpen) {
	// 		dispatch('animateImage');
	// 	}
  	// });
</script>


<Overlay handleClick={closeDrawer} />

<div class="drawer {location} {isDrawerOpen ? 'bottom-show' : 'bottom-hide'}" transition:fly={{y: isDrawerOpen ? 100 : 0 }}>
    <div class="action">
        <button class="close-button" on:click={closeDrawer}>X</button>
    </div>
    <slot></slot>
</div>

<style>
    .drawer {
        position: fixed;
        background-color: #fff;
        color: black;
        z-index: 500;
        padding: 10px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: start;
        transition: bottom 0.3s ease;
        box-shadow: 0px -2px 5px rgba(0, 0, 0, 0.2);
    }

    .action {
        width: 100%;
        text-align: right;
    }

    .bottom {
        bottom: 0;
        border-radius: 10px 10px 0 0;
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

    .close-button {
		background-color: black;
		border: 3px solid black;
		width: 50px;
		height: 50px;
		border-radius: 50%;
        color: white;
        position: relative;
        top: 0;
        right: 0;
	}

    .close-button:hover {
        cursor: pointer;
		background-color: #a6f0ff;
        border: 3px solid #a6f0ff;
        color: black
    }

    @media (max-width: 720px) {
        .drawer {
            flex-direction: column;
            max-height: 75%;
            overflow-y: auto;
            min-width: 375px;
        }
    }
</style>