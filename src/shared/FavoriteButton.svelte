<script lang="ts">
    import FavoritesStore from "../stores/FavoritesStore";

    export let shoe: any = <any>{};

    $: isFavorited = $FavoritesStore.find((current) => current.id === shoe.id);

    const handleClick = () => {
        if (isFavorited) {
            let filtered = $FavoritesStore.filter(item => item.id !== shoe.id);
            FavoritesStore.update((store) => {
                return [...filtered];
            })
            return;
        }
        
        FavoritesStore.update((store) => {
            return [...store, shoe];
        })
    }
</script>

<button class="favorite-button {isFavorited ? 'selected' : ''}" on:click={handleClick}>
    <i class="fa-solid fa-heart" />
</button>

<style>
    .favorite-button {
        border: none;
        background-color: white;
        font-size: 24px;
        color: black;
    }

    .favorite-button:hover {
        cursor: pointer;
    }

    .selected {
        color: red;
    }
</style>