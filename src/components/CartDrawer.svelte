<script lang="ts">
    import { onMount } from "svelte";
    import { fly, fade } from "svelte/transition";

    import Drawer from "../shared/Drawer.svelte";
    import CartStore from "../stores/CartStore";

    export let isCartOpen: boolean = false;
    export let toggleCart;
    // let itemToRemove = null;

    $: totalCost = $CartStore.reduce((total, current) => total + current.price, 0);

    onMount(() => {
        console.log($CartStore);
    });

    const emptyCart = () => {
        CartStore.update(() => {
            return [];
        })
    };

    const removeFromCart = (cartItem) => {
        let filtered = $CartStore.filter((item, index) => {
            return index !== cartItem;
        });
        CartStore.update((cart) => {
            return [...filtered];
        });
        // itemToRemove = cartItem;
    }
</script>

<Drawer location="right" isDrawerOpen={isCartOpen} on:closeDrawer={toggleCart}>
    <div class="container">
        <h2>Your Cart</h2>
        <div class="cart">
            {#each $CartStore as item, i (`${item.id}_${item.size}_${i}`)}
            <div class="item">
            <!-- <div class="item" out:fly={{ x: i === itemToRemove ? -50 : 0, duration: 1000 }}> -->
                    <button class="remove-button" on:click={() => removeFromCart(i)}><i class="fa-solid fa-trash"></i></button>
                    <div style="max-width: 70px; margin-left: 20px">
                        <img style="object: contain; width: 100%;" src={item.image} alt={item.title} />
                    </div>
                    <div style="margin-left: 20px; justify-content: start; flex: 2;">
                        <p style="margin-bottom: 0">{item.title}</p>
                        <p>Size: {item.size}</p>
                    </div>
                    <div style="margin-left: 20px;">
                        <p>${item.price}</p>
                    </div>
                </div>
            {/each}
        </div>
        <div style="text-align: right;">
            <p>Total Cost: ${totalCost}</p>
            <button on:click={emptyCart}>Empty Cart</button>
        </div>
    </div>
</Drawer>

<style>
    .cart {
        display: flex;
        flex-direction: column;

    }

    .container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
    }

    .item {
        display: flex;
        justify-content: space-between;
        margin: 10px 0;
    }

    .remove-button {
        border: none;
        background-color: transparent;
        font-size: 20px;
    }

    .remove-button:hover {
        cursor: pointer;
        color: red;
    }
</style>