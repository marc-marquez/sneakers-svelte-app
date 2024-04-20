<script>
    import { createEventDispatcher } from "svelte";
    import Overlay from "./Overlay.svelte";

    let dispatch = createEventDispatcher();

    export let location = 'bottom';

    const closeDrawer = () => {
        dispatch('closeDrawer');
    }
</script>


<Overlay handleClick={closeDrawer} />

<div class="drawer {location}">
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
        padding: 10px;
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        align-items: flex-start;
        justify-content:flex-start;
        transition: 0.5 right ease-in;
    }

    .action {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        width: 100%;
    }

    .bottom {
        bottom: 0;
        left: 0;
        border-radius: 10px 10px 0 0;
        max-height: 40vh;
        width: 95vw;
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