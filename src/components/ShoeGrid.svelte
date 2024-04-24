<script>
    import { fly } from "svelte/transition";
    import { createEventDispatcher } from "svelte";
    import RowContainer from "../shared/RowContainer.svelte";
    import Card from "../shared/Card.svelte";
    import ColumnContainer from "../shared/ColumnContainer.svelte";

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

    const getShoeDetails = (index) => {
        dispatch('getShoeDetails', index);
    }
</script>


<RowContainer style="align-items: flex-start; justify-content: center; flex: 1; align-self: center;">
    {#each shoes as shoe, index (shoe.id)}
        {#if shoe.image}
        <Card bgcolor="white" border="none" on:openDrawer={() => getShoeDetails(index)}>
            {#if !isLoading}
            <div style="max-width: 200px;">
                <img style="object-fit: contain; width: 100%" src={shoe.image} alt={shoe.name} in:fly={{ y: -50, duration: 2000 }} />
            </div>
            {/if}
        </Card>
        {/if}
    {/each}
</RowContainer>

<style>

</style>