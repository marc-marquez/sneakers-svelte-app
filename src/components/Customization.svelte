<script>
    import { createEventDispatcher } from "svelte";
    import ColumnContainer from "../shared/ColumnContainer.svelte";
    import RowContainer from "../shared/RowContainer.svelte";
    import CircleButton from "../shared/CircleButton.svelte";

    export let variants = [];
    export let currentShoeVariant;
    export let currentCategory;

    let dispatch = createEventDispatcher();


    const setVariant = (index) => {
        dispatch('setVariant', index);
    }

    const categoryChange = (e) => {
        console.log(e.target.value);
        dispatch('categoryChange', e.target.value);
    }

</script>

<div class="container">
    <h1 style="text-align: center;">Customization</h1>
    <ColumnContainer>
        <h1 style="text-align: center;">Gender</h1>
        <select bind:value={currentCategory}  on:change={categoryChange} style="font-size: 24px; background-color: #a6f0ff; border: 2px solid #a6f0ff; font-weight: bold; padding: 10px; align-items: center; justify-content: center; border-radius: 50px;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);">
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="kids">Kids</option>
        </select>
        <h1 style="text-align: center;">Price Slider</h1>
        {#if variants.length > 0}
            <h1 style="text-align: center;">Select Size</h1>
            <RowContainer style="align-items: flex-start; justify-content: center;">
                {#each variants as variant, i (variant.size)}
                    <button class="variant-button {i === currentShoeVariant ? 'selected' : ''}" on:click={() => setVariant(i)}>{variant.size}</button>
                {/each}
            </RowContainer>
        {/if}
    </ColumnContainer>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        max-width: 200px;
        padding: 10px;
    }

    .variant-button {
		background-color: black;
		width: 40px;
		height: 40px;
		margin: 2px;
		border-radius: 50%;
		border: 2px solid black;
		color: white;
	}

	.variant-button:hover {
		cursor: pointer;
		background-color: lightgrey;
		border: 2px solid lightgrey;
		color: black;
	}

	.variant-button.selected {
		background-color: #a6f0ff;
		border: 2px solid #a6f0ff;
		color: black

	}

    @media (max-width: 960px) {
        .container {
            max-width: 100%;
        }
    }
</style>