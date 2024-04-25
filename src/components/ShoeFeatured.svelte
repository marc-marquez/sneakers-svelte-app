<script>
	import { fly } from 'svelte/transition';
    import { createEventDispatcher } from 'svelte';
    import RowContainer from "../shared/RowContainer.svelte";
    import CircleButton from '../shared/CircleButton.svelte';
    import ColumnContainer from '../shared/ColumnContainer.svelte';
    import FavoriteButton from '../shared/FavoriteButton.svelte';
    import StarRating from '../shared/StarRating.svelte';
    import AddToCart from '../shared/AddToCart.svelte';
    
    export let shoes;
    export let currentShoeIndex;
    export let isLoading;

    let dispatch = createEventDispatcher();

    const nextShoe = () => {
        dispatch('getNextShoe');
	}

	const prevShoe = () => {
        dispatch('getPrevShoe')
	}
</script>

<div class="container">
    {#if shoes.length > 0 && shoes[currentShoeIndex].image && !isLoading}
    <ColumnContainer>
        <div style="max-width: 800px; text-align: center;">
            <img style="object-fit: contain; width: 100%" src={shoes[currentShoeIndex].image} alt={shoes[currentShoeIndex].title} in:fly={{ y: -50, duration: 2000 }} />
        </div>
    </ColumnContainer>
    {/if}
</div>

<style>
    .container {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px;
        flex: 1;
        flex-wrap: wrap;
    }
</style>