<script lang="ts">
    let isFavorited:boolean = false;
    const handleClickFavorite = () => {
        isFavorited = !isFavorited;
    }
</script>

<button class="favorite-button {isFavorited ? 'selected' : ''}" on:click={() => handleClickFavorite()}>
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