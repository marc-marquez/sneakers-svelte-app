<script>
    import { fly } from "svelte/transition";
    import { createEventDispatcher } from "svelte";
    import RowContainer from "../shared/RowContainer.svelte";
    import Card from "../shared/Card.svelte";

    export let shoes;
    export let currentPage;
    export let totalPages;
    export let isLoading = false;

    const dispatch = createEventDispatcher();

    const getPrevPage = () => {
        dispatch('getPrevPage');
    }

    const getNextPage = () => {
        dispatch('getNextPage');
    }

    const getShoeDetails = () => {
        dispatch('getShoeDetails');
    }
</script>


<RowContainer style="align-items: flex-start; justify-content: center; flex: 1;">
    {#each shoes as shoe (shoe.id)}
        {#if shoe.image}
        <Card bgcolor="white" border="none" on:openDrawer={() => getShoeDetails(shoe)}>
            {#if !isLoading}
            <div style="width: 200px;">
            <img style="object-fit: contain; width: 100%" src={shoe.image} alt={shoe.name} in:fly={{ y: -100, duration: 2000 }} />
            </div>
            {/if}
        </Card>
        {/if}
    {/each}
</RowContainer>
<RowContainer>
    <button on:click={() => getPrevPage()} disabled="{currentPage < 2}">Prev</button>
    <button on:click={() => getNextPage()} disabled="{currentPage === totalPages}">Next</button>
</RowContainer>

<style>

</style>