<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let shoe: any = {};

    const dispatch = createEventDispatcher();

    let current = null;

    const setVariant = (index: number) => {
        current = current === index ? null : index;
        dispatch("setVariant", current);
    };
</script>

<div class="variants">
    {#each shoe.variants as variant, i (i)}
        <button class="variant-button {i === current ? 'selected' : ''}" value={i} on:click={() => setVariant(i)}>{variant.size}</button>
    {/each}
</div>

<style>
    .variants {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
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
</style>