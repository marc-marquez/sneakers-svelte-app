<script lang="ts">
    import { fly } from "svelte/transition";
    import { createEventDispatcher } from "svelte";
    import RowContainer from "../shared/RowContainer.svelte";
    import Card from "../shared/Card.svelte";
    import ColumnContainer from "../shared/ColumnContainer.svelte";

    export let shoes: Array<any> = [];
    export let currentPage: number = 0;
    export let totalPages: number = 0;
    export let isLoading: boolean = false;

    const dispatch = createEventDispatcher();

    const getPrevPage = () => {
        dispatch('getPrevPage');
    }

    const getNextPage = () => {
        dispatch('getNextPage');
    }

    const getShoeDetails = (index: number) => {
        dispatch('getShoeDetails', index);
    }
</script>


<RowContainer style="align-items: flex-start; justify-content: center; flex: 1; align-self: center;">
    {#each shoes as shoe, index (shoe.id)}
        {#if shoe.image}
        <Card on:openDrawer={() => getShoeDetails(index)}>
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