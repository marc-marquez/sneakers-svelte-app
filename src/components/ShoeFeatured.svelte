<script>
	import { fly } from 'svelte/transition';
    import { createEventDispatcher } from 'svelte';
    import RowContainer from "../shared/RowContainer.svelte";
    import CircleButton from '../shared/CircleButton.svelte';
    import ColumnContainer from '../shared/ColumnContainer.svelte';
    import FavoriteButton from '../shared/FavoriteButton.svelte';
    import StarRating from '../shared/StarRating.svelte';

    export let shoes;
    export let currentShoeIndex;
    export let currentShoeVariant;
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
<!-- <RowContainer style="align-items: center; justify-content: center; padding: 10px; flex: 1; flex-wrap: nowrap;"> -->
    {#if shoes.length > 0 && shoes[currentShoeIndex].image && !isLoading}
    <!-- <CircleButton handleClick={() => prevShoe()} disabled={currentShoeIndex <= 0}>
        <span>Prev</span>
    </CircleButton> -->
    <ColumnContainer style="padding: 10px">
        <div style="max-width: 800px; text-align: center">
            <img style="object-fit: contain; width: 100%" src={shoes[currentShoeIndex].image} alt={shoes[currentShoeIndex].title} in:fly={{ y: -50, duration: 2000 }} />
            <RowContainer style="flex-wrap: nowrap;">
                <CircleButton handleClick={() => prevShoe()} disabled={currentShoeIndex <= 0}>
                    <span>Prev</span>
                </CircleButton>
                <h1>{shoes[currentShoeIndex].title}</h1>
                <CircleButton handleClick={() => nextShoe()} disabled={currentShoeIndex >= shoes.length - 1}>
                    <span>Next</span>
                </CircleButton>
            </RowContainer>
            <RowContainer>
                <StarRating />
                <FavoriteButton />
                <p>Add to Cart</p>
                <h2>${shoes[currentShoeIndex].variants[currentShoeVariant].price}</h2>
            </RowContainer>
        </div>
    </ColumnContainer>
    <!-- <CircleButton handleClick={() => nextShoe()} disabled={currentShoeIndex >= shoes.length - 1}>
        <span>Next</span>
    </CircleButton> -->
    {/if}
<!-- </RowContainer> -->
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

    @media (max-width) {
        .container {

        }
    }
</style>