<script>
	// import { onMount } from 'svelte';
    import { fly } from 'svelte/transition';
    import { createEventDispatcher } from 'svelte';
    
    import Drawer from "../shared/Drawer.svelte";
    import Card from "../shared/Card.svelte";
    import RowContainer from "../shared/RowContainer.svelte";

    // export let toggleDrawer;
    export let isDrawerOpen;
    export let shoe;

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

    const toggleDrawer = () => {
        dispatch('toggleDrawer');
    }
</script>

<Drawer on:closeDrawer={toggleDrawer} {isDrawerOpen}>
    <!-- <RowContainer style="padding: 0 40px 40px 50px; flex-wrap: nowrap;"> -->
    <div class="container">
        <!-- <div class="drawer-shoe-image-container">
            <img class="drawer-shoe-image" src="{shoe.image}" alt={shoe.title} style="max-width: 400px" />
        </div> -->
        <div style="max-width: 300px;">
            <img src="{shoe.image}" alt={shoe.title} style="object-fit: contain; width: 100%;" in:fly={{ y: -50, duration: 2000 }} />
        </div>
        <div style="margin-left: 40px; flex-grow: 2">
            <h1 style="margin: 0">{shoe.title}</h1>
            {#if shoe.description}
                <p>{@html shoe.description}</p>
            {:else}
                <p style="width: 100%;">No description available</p>
            {/if}
            <RowContainer style="justify-content: start;">
                {#each shoe.variants as variant}
                    <Card style="background-color: black; color: white; width: 100px; height: 40px; margin: 1px;">
                        <p style="margin: 0; padding: 0">Size: {variant.size}</p>
                        <p style="margin: 0; padding: 0">${variant.price}</p>
                    </Card>
                {/each}
            </RowContainer>
        </div>
    <!-- </RowContainer> -->
    </div>
</Drawer>

<style>
    .container {
        display: flex;
        flex-direction: row;
        padding: 0 20px 50px 20px;
        align-items: center;
        /* flex-wrap: nowrap; */
    }

    .drawer-shoe-image-container {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		object-fit: contain;
		overflow: hidden;
		position: relative;
	}

	.drawer-shoe-image {
		position: absolute;
		top: -100%;
		left: 50%;
		transform: translateX(-50%);
		transition: top 0.5s ease, transform 0.5s ease; /* Transition for smooth animation */
	}

    @media (max-width: 720px) {
        .container {
            flex-direction: column;
            max-height: 100%;
        }
    }
</style>