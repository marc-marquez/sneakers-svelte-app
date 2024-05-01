<script lang="ts">
	// import { onMount } from 'svelte';
    import { fly } from 'svelte/transition';
    import { createEventDispatcher } from 'svelte';
    
    import Drawer from "../shared/Drawer.svelte";
    import Card from "../shared/Card.svelte";
    import RowContainer from "../shared/RowContainer.svelte";

    export let isDetailsDrawerOpen: boolean = false;
    export let shoe: any = {};

    const dispatch = createEventDispatcher();

    // let containerHeight;
  	// let imageHeight;

    // const animateImage = () => {
	// 	const image = document.getElementsByClassName('drawer-shoe-image')[0];
	// 	const container = document.getElementsByClassName('drawer-shoe-image-container')[0];

	// 	containerHeight = container.clientHeight;
	// 	imageHeight = image.clientHeight;

	// 	if (containerHeight > imageHeight) {
	// 		// Fall animation
	// 		image.style.top = `${containerHeight - imageHeight}px`;

	// 		// Bounce animation
	// 		setTimeout(() => {
	// 			image.style.transform = 'translateX(-50%) translateY(-50px)'; // Bounce up
	// 			setTimeout(() => {
	// 				image.style.transform = 'translateX(-50%) translateY(0)'; // Bounce back to original position
	// 			}, 500); // Wait for the bounce up animation to complete
	// 		}, 500); // Wait for the fall animation to complete
	// 	}
	// }

    // onMount(() => {
	// 	const container = document.getElementsByClassName('drawer-shoe-image-container')[0];
	// 	containerHeight = container.clientHeight;
	// 	const image = document.getElementsByClassName('drawer-shoe-image')[0];
	// 	imageHeight = image.clientHeight;
	// });

    // window.addEventListener('resize', () => {
	// 	const container = document.getElementsByClassName('drawer-shoe-image-container')[0];
	// 	containerHeight = container.clientHeight;
	// 	const image = document.getElementsByClassName('drawer-shoe-image')[0];
	// 	imageHeight = image.clientHeight;
	// });

    const toggleDetailsDrawer = () => {
        dispatch('toggleDetailsDrawer');
    }
</script>

<Drawer on:closeDrawer={toggleDetailsDrawer} isDrawerOpen={isDetailsDrawerOpen}>
    <div class="container">
        <div class="image-container">
            <img src="{shoe.image}" alt={shoe.title} />
        </div>
        <div class="details-container">
            <h1 style="margin: 0">{shoe.title}</h1>
            {#if shoe.description}
                <p>{@html shoe.description}</p>
            {:else}
                <p style="width: 100%;">No description available</p>
            {/if}
            <div class="variants">
                {#each shoe.variants as variant}
                    <Card style="background-color: black; color: white; width: 100px; height: 40px; margin: 1px;">
                        <p style="margin: 0; padding: 0;">Size: {variant.size}</p>
                        <p style="margin: 0; padding: 0;">${variant.price}</p>
                    </Card>
                {/each}
            </div>
        </div>
    </div>
</Drawer>

<style>
    .container {
        display: flex;
        flex-direction: row;
        padding: 20px;
        align-items: center;
    }

    .image-container {
        max-width: 300px;
	}
    
    img {
        object-fit: contain;
        width: 100%;
    }

    .details-container {
        margin-left: 40px;
        flex-grow: 2;
    }

    .variants {
        display: flex;
        flex-direction: row;
        justify-content: start;
        flex-wrap: wrap;

    }

    @media (max-width: 720px) {
        .container {
            flex-direction: column;
            max-height: 50%;
            padding: 5px;
        }

        .variants {
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
        }

        .details-container {
            margin-left: 0;
            margin-top: 20px;
            text-align: center;
        }
    }
</style>