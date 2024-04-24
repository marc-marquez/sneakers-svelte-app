<script>
    import { createEventDispatcher } from "svelte";

    // export let bgcolor = 'black';
    // export let color = 'white';
    // export let margin = '10px';
    // export let border = '1px solid black';
    // export let width = '200px';
    // export let height = '150px';

    export let classes = '';
    export let style = '';

    const dispatch = createEventDispatcher();

    const handleClick = () => {
        dispatch('openDrawer');
    }
</script>

<div 
    class="card {classes}" 
    style={style}
    on:click={handleClick}
>
    <slot></slot>
</div>

<style>
    .card {
        /* width: 200px;
        height: 150px; */
        padding: .5px;
        border-radius: 1rem;
        border: 5px solid transparent;
        background-color: white;
        margin: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    .card:hover {
        border: 5px solid #a6f0ff;
        cursor: pointer;
    }
</style>