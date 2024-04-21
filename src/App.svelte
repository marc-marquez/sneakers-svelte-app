<script>
	import { fade, fly } from 'svelte/transition';

	import Header from "./components/Header.svelte";
	import Footer from "./components/Footer.svelte";
	import Card from "./components/Card.svelte";
	import Drawer from "./components/Drawer.svelte";

    let brands = ['Nike', 'Adidas', 'New Balance', 'Converse', 'Reebok', 'Puma', 'Fila'];
    let shoes = [];
    let totalPages = 0;
    let currentPage = 1;
    let currentBrand = '';
    let details;
    let isDrawerOpen = false;
	let isLoading = false;

	const getShoes = (brand, page=1) => {
		isLoading = true;
        fetch(`https://api.stockx.vlour.me/search?query=${brand} shoes&page=${page}`)
            .then(response => response.json())
            .then(data => {
                shoes = data.hits;
                totalPages = data.pages;
				console.log(shoes);
				isLoading = false;
            })
			.catch(err => {
				console.error(err);
				isLoading = false;
			});
    }

	const setBrandAndGet = (brand) => {
        currentBrand = brand;
        currentPage = 1;
        getShoes(currentBrand);
    };

	const toggleDrawer = () => {
        isDrawerOpen = !isDrawerOpen;
    }

	const getShoeDetails = (shoe) => {
        console.log(shoe);
        isDrawerOpen = true;
        details = shoe;

		details.variants.forEach(variant => {
			if (variant.size.includes('Y')) {
				variant.size = variant.size.replace('Y', '');
			}

			if (variant.size.includes('C')) {
				variant.size = variant.size.replace('C', '');
			}

			if (variant.size.includes('W')) {
				variant.size = variant.size.replace('W', '');
			}
		});
		
		details.variants.sort((a, b) => a.size - b.size);

		console.log(details);
    }

	const getNextPage = () => {
        currentPage+=1;
        getShoes(currentBrand, currentPage);
    }

    const getPrevPage = () => {
        if (currentPage > 1) {
            currentPage-=1;
        }

        getShoes(currentBrand, currentPage);
    }

</script>

<Header name="Sneaks"/>
<main>
	<section class="flex-row flex-wrap flex-justify-space-between" style="align-items: flex-start">
        {#each brands as brand}
		<button class="brand-button" on:click={() => setBrandAndGet(brand)}>
			<img class="brand-image" alt="{brand} logo"src="{`https://logo.clearbit.com/${brand.replace(/\s+/g, '')}.com`}?size=75" />
		</button>
        {/each}
    </section>
	<section class="flex-row flex-justify-end">
        <button on:click={() => getPrevPage()} disabled="{currentPage < 2}">Prev</button>
        <button on:click={() => getNextPage()} disabled="{currentPage === totalPages}">Next</button>
    </section>
	<section class="flex-row flex-wrap" style="align-items: flex-start; justify-content: center;">
        {#each shoes as shoe}
			{#if shoe.image}
			<Card bgcolor="white" border="none" on:openDrawer={() => getShoeDetails(shoe)}>
				{#if !isLoading}
				<img class="shoe-image" src={shoe.image} alt={shoe.name} in:fly={{ y: 200, duration: 2000 }} out:fade/>
				{/if}
			</Card>
			{/if}
        {/each}
    </section>
</main>
<Footer />
{#if isDrawerOpen}
<Drawer on:closeDrawer={toggleDrawer} {isDrawerOpen}>
	<div class="flex-row shoe-details" style="width: 100%">
		<div style="display: flex; justify-content: center; align-items: center; width: 100%; object-fit: contain;">
			{#if details.image}
			<img src="{details.image}" alt={details.name} width="300px" transition:fade />
			{/if}
		</div>
		<div>
			<h1>{details.title}</h1>
			{#if details.description}
				<p>{@html details.description}</p>
			{:else}
				<p style="width: 100%">No description available</p>
			{/if}
			<div class="flex-row flex-wrap" style="margin: 5px; align-items: flex-start;">
				{#each details.variants as variant}
					<Card width="100px" height="40px" margin="1px">
						<span>Size: {variant.size}</span>
						<span>${variant.price}</span>
					</Card>
				{/each}
			</div>
		</div>
	</div>
</Drawer>
{/if}

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	.flex-wrap {
		flex-wrap: wrap;
	}

	.flex-row {
		display: flex;
		flex-direction: row;
	}

	.flex-col {
		display: flex;
		flex-direction: column;
	}

	.flex-justify-end {
		justify-content: flex-end;
	}

	.flex-justify-space-between {
		justify-content: space-between;
	}

	.shoe-image {
		object-fit: contain;
		width: 80%;
	}

	.brand-button {
		background-color: black;
		border: 3px solid black;
		width: 150px;
		height: 150px;
		border-radius: 50%;
	}

	.brand-button:hover {
		border: 3px solid red;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

	@media (max-width: 640px) {
		.shoe-details {
			flex-direction: column;
			overflow-y: auto;
		}
	}
</style>