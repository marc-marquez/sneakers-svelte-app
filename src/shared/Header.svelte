<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import DISPLAY_FORMAT from "../constants/DisplayFormats";

    export let name: string = '';

    let displayFormat: string = DISPLAY_FORMAT.featured;

    const dispatch = createEventDispatcher();

    const handleDisplayFormatChange = (event) => {
        dispatch("displayFormatChange", event.target.value);
    }

    const openCart = () => {
        dispatch("openCart");
    }

</script>

<header>
    <nav>
        <h1 class="title">{name}</h1>
        <!-- <div>
            <input type="text" class="search-input" />
            <button class="category-button"><h2>Cart</h2></button>
        </div> -->
        <div>
            <span>Viewing Style: </span>
            <select class="display-select" bind:value={displayFormat} on:change={handleDisplayFormatChange}>
                <option value={DISPLAY_FORMAT.featured}>Spotlight</option>
                <option value={DISPLAY_FORMAT.grid}>Window Shopping</option>
                <option value={DISPLAY_FORMAT.list}>Deep Dive</option>
            </select>
            <button style="border: none; background-color: transparent; font-size: 24px;" on:click={openCart}><i class="fa-solid fa-cart-shopping"></i></button>
        </div>
    </nav>
</header>

<style>
    header {
        width: 100%;
    }

    nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 50px;
        background-color: #a6f0ff;
        border-radius: 50px 0 50px 0;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
    }

    .title {
        font-size: 3rem;
        padding: 0;
        margin: 0;
    }

    /* .search-input {
        padding: 5px;
        border-radius: 10px;
        border: 1px solid lightgrey;
    } */

    label, span {
        font-family: 'Ostrich Sans', sans-serif;
        font-size: 20px;
        font-weight: 900;
    }

    .display-select {
        border: none;
        background: white;
        padding: 10px;
        margin: 10px;
        font-size: 20px;
        font-weight: 900;
        border-radius: 50px;
        text-align: center;
    }

    @media (max-width: 960px) {
    }
</style>