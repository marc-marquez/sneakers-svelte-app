<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let name: string = '';

    let displayFormat: string = "featured";

    const dispatch = createEventDispatcher();

    const handleDisplayFormatChange = (event) => {
        displayFormat = event.target.value;
        dispatch("displayFormatChange", displayFormat);
    }

</script>

<header>
    <div class="navbar">
        <h1 class="title">{name}</h1>
        <!-- <div style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <span>Viewing Option:</span>
            <label>
                <input type="radio" value="featured" bind:group={displayFormat} on:change={handleDisplayFormatChange}/>
                Spotlight
            </label>
            <label>
                <input type="radio" value="grid" bind:group={displayFormat} on:change={handleDisplayFormatChange}/>
                Window Shopping
            </label>
            <label>
                <input type="radio" value="list" bind:group={displayFormat} on:change={handleDisplayFormatChange}/>
                Deep Dive
            </label>
        </div> -->
        <!-- <div>
            <input type="text" class="search-input" />
            <button class="category-button"><h2>Cart</h2></button>
        </div> -->
    </div>
</header>

<style>
    header {
        /* background-color: #a6f0ff; */
        width: 100%;
    }

    .navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        background-color: #a6f0ff;
        border-radius: 50px;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
    }

    /* .category-button {
        border: none;
        background-color: #a6f0ff;
        padding: 10px;
        font-size: 24px;
        font-weight: bold;
    }

    .category-button:hover {
        background-color: white;
        border-radius: 5px;
    }


    .selected {
        background-color: white;   
    }

    .unselected {
     background-color: #a6f0ff;   
    } */

    .title {
        font-size: 3rem;
        padding: 0;
        margin: 0;
    }

    .search-input {
        padding: 5px;
        border-radius: 10px;
        border: 1px solid lightgrey;
    }

    h2 {
        margin: 0;
    }

    label, span {
        font-family: 'Ostrich Sans', sans-serif;
        font-size: 20px;
        font-weight: 900;
    }

    @media (max-width: 960px) {
        .navbar {
            flex-direction: column;
            justify-content: space-between;
            padding: 20px 5px;
            border-radius: 0;
        }
    }
</style>