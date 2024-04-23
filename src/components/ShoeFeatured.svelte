<script>
	import { fly } from 'svelte/transition';
    import { createEventDispatcher } from 'svelte';
    import RowContainer from "../shared/RowContainer.svelte";
    import CircleButton from '../shared/CircleButton.svelte';
    import ColumnContainer from '../shared/ColumnContainer.svelte';

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

<RowContainer style="align-items: center; justify-content: center; padding: 10px; flex: 1; flex-wrap: nowrap;">
    {#if shoes.length > 0 && shoes[currentShoeIndex].image && !isLoading}
    <CircleButton handleClick={() => prevShoe()} disabled={currentShoeIndex <= 0}>
        <span>Prev</span>
    </CircleButton>
    <ColumnContainer style="padding: 10px">
        <div style="max-width: 800px; text-align: center">
            <img style="object-fit: contain; width: 100%" src={shoes[currentShoeIndex].image} alt={shoes[currentShoeIndex].title} in:fly={{ y: -100, duration: 2000 }} />
            <h1>{shoes[currentShoeIndex].title}</h1>
            <RowContainer>
                <p>Stars</p>
                <p>Favorite</p>
                <p>Add to Cart</p>
                <h2>${shoes[currentShoeIndex].variants[currentShoeVariant].price}</h2>
            </RowContainer>
        </div>
    </ColumnContainer>
    <CircleButton handleClick={() => nextShoe()} disabled={currentShoeIndex >= shoes.length - 1}>
        <span>Next</span>
    </CircleButton>
    {/if}
</RowContainer>

<style>

</style>