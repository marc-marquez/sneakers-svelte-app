<script lang="ts">
	import { fly } from 'svelte/transition';
    import { createEventDispatcher, onMount } from 'svelte';
    import ColumnContainer from '../shared/ColumnContainer.svelte';
    
    export let shoes: Array<any> = [];
    export let currentShoeIndex: number = 0;
    export let isLoading: boolean = false;

    let dispatch = createEventDispatcher();
</script>

<div class="container">
    {#if shoes.length > 0 && !isLoading}
    <ColumnContainer>
        <div style="max-width: 600px; text-align: center;">
            {#if shoes[currentShoeIndex].image}
            <img src={shoes[currentShoeIndex].image} alt={shoes[currentShoeIndex].title} in:fly={{ y: -25, duration: 2000 }} />
            {:else}
            <img src="https://placehold.co/600?text=No+Image+Found&font=roboto" alt="placerholder" />
            {/if}
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

    img {
        object-fit: contain;
        width: 100%;
        height: 30vh;
    }

    @media (max-width:  720px) {
        img {
            height: 20vh;
        }
    }
</style>