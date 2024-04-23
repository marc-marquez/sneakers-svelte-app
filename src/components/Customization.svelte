<script>
    import { createEventDispatcher } from "svelte";
    import ColumnContainer from "../shared/ColumnContainer.svelte";
    import RowContainer from "../shared/RowContainer.svelte";
    import CircleButton from "../shared/CircleButton.svelte";

    export let variants = [];
    export let currentShoeVariant;

    let dispatch = createEventDispatcher();


    const setVariant = (index) => {
        dispatch('setVariant', index);
    }
</script>

<ColumnContainer style="padding: 10px; max-width: 200px;">
    <h1 style="text-align: center;">Customization</h1>
    <ColumnContainer>
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
</ColumnContainer>

<style>
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
</style>