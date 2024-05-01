<script lang="ts">
    import CartStore from "../stores/CartStore";

    export let currentShoe: any = <any>{};
    export let currentShoeVariant: number;
    let isAdded: boolean = false;
    const modifyCart = () => {
        if (!currentShoe || !currentShoeVariant) {
            console.error('No shoe or variant chosen.');
            return;
        }

        if (isAdded) {
            isAdded = false;
            return;
        }

        let order = {
            id: currentShoe.id,
            title: currentShoe.title,
            image: currentShoe.image,
            size: currentShoe.variants[currentShoeVariant].size,
            price: currentShoe.variants[currentShoeVariant].price
        }

        CartStore.update((cart) => {
            return [order, ...cart];
        });

        console.log('order: ', order);
        isAdded = true;
    }
</script>

<button class="add-button {isAdded ? 'selected' : ''}" on:click={modifyCart} disabled={!currentShoeVariant}>
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

    .add-button:disabled {
        cursor: not-allowed;
        color: grey;
    }

    .selected {
        color: #a6f0ff;
    }
</style>