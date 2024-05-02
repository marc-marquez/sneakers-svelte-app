<script lang="ts">
    import FavoriteStore from "../stores/FavoriteStore";

    export let id: string = '';

    $: isFavorited = $FavoriteStore.find((current) => current === id);

    const handleClick = () => {
        if (isFavorited) {
            let filtered = $FavoriteStore.filter(item => item !== id);
            FavoriteStore.update((store) => {
                return [...filtered];
            })
            return;
        }
        
        FavoriteStore.update((store) => {
            return [...store, id];
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