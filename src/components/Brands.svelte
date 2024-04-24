<script>
import { createEventDispatcher } from "svelte";
import ColumnContainer from "../shared/ColumnContainer.svelte";

export let currentBrand;
export let brands;

const dispatch = createEventDispatcher();

const handleSetBrand = (brand) => {
    dispatch('handleSetBrand', brand);
}

</script>

<div class="brands-container">
    {#each brands as brand (brand)}
    <button class="brand-button {currentBrand === brand ? 'selected' : ''}" on:click={() => handleSetBrand(brand)}>
        {#if brand === 'Jordan'}
            <img class="brand-image" alt="{brand} logo" src="https://upload.wikimedia.org/wikipedia/en/thumb/3/37/Jumpman_logo.svg/250px-Jumpman_logo.svg.png" width="50"/>
        {:else}
            <img class="brand-image" alt="{brand} logo" src="{`https://logo.clearbit.com/${brand.replace(/\s+/g, '')}.com`}?size=50" />
        {/if}
    </button>
    {/each}
</div>

<style>
    .brands-container {
		display: flex;
		flex-direction: column;
		padding: 10px;
		overflow-y: auto;
	}

	.brands-container::-webkit-scrollbar {
		display: none;
	}

    .brand-button {
		background-color: white;
		border-left: 5px solid white;
		border: none;
		margin-bottom: 10px;
	}

	.brand-image {
		object-fit: contain;
	}

	.brand-button:hover {
		cursor: pointer;
		border-left: 5px solid lightgrey;
	}

	.brand-button.selected {
		border-left: 5px solid #a6f0ff;
	}

	@media (max-width: 960px){
		.brands-container {
			flex-direction: row;
			flex-wrap: wrap;
			align-items: center;
			justify-content: center;
		}

		.brand-button {
			margin-right: 5px;
		}

		.brand-button:hover {
			border-left: none;
			border-bottom: 5px solid lightgrey;
		}

		.brand-button.selected {
			border-left: none;
			border-bottom: 5px solid #a6f0ff;
		}
	}
</style>