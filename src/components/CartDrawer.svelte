<script lang="ts">
    import { onMount } from "svelte";
    import Drawer from "../shared/Drawer.svelte";
    import CartStore from "../stores/CartStore";

    export let isCartOpen: boolean = false;
    export let toggleCart;

    $: totalCost = $CartStore.reduce((total, current) => total + current.price, 0);

    onMount(() => {
        console.log($CartStore);
    });

    const emptyCart = () => {
        CartStore.update(() => {
            return [];
        })
    };
</script>

<Drawer location="right" isDrawerOpen={isCartOpen} on:closeDrawer={toggleCart}>
    <div class="container">
        <h2>Your Cart</h2>
        <div class="cart">
            {#each $CartStore as item (`${item.id}_${item.size}`)}
                <div class="item">
                    <div style="max-width: 70px">
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
        <!-- Button to clear cart -->
        <!-- Buttons to remove or modify item -->
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
</style>