<script lang="ts">
    let isAdded: boolean = false;
    const handleClick = () => {
        console.log('Added to cart');
    }
</script>

<button class="add-button {isAdded ? 'selected' : ''}" on:click={() => handleClick()}>
    <i class="fa-solid fa-cart-plus" />
</button>

<style>
    .add-button {
        border: none;
        background-color: white;
        font-size: 24px;
        color: black;
    }

    .add-button:hover {
        cursor: pointer;
    }

    .selected {
        color: red;
    }
</style>