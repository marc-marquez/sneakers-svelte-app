<script>
	import Header from "./components/Header.svelte";
	import Footer from "./components/Footer.svelte";
	import Card from "./components/Card.svelte";
	import Drawer from "./components/Drawer.svelte";

    let brands = ['Nike', 'Adidas', 'New Balance', 'Converse', 'Reebok'];
    let shoes = [];
    let totalPages = 0;
    let currentPage = 1;
    let currentBrand = '';
    let details;
    let isDrawerOpen = false;

	const getShoes = (brand, page=1) => {
        fetch(`https://api.stockx.vlour.me/search?query=${brand} shoes&page=${page}`)
            .then(response => response.json())
            .then(data => {
                shoes = data.hits;
                totalPages = data.pages;
				console.log(shoes);
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
    }

</script>

<Header name="Sneaks"/>
<main>
	<section class="flex-row flex-wrap">
        {#each brands as brand}
        <Card>
            <div class="flex-col">
                <img class="brand-image" alt="{brand} logo"src="{`https://logo.clearbit.com/${brand.replace(/\s+/g, '')}.com`}?size=75" />
                <button style="margin: 5px;" on:click={() => setBrandAndGet(brand)}>Get Shoes</button>
            </div>
        </Card>
        {/each}
    </section>
	<section class="flex-row flex-wrap">
        {#each shoes as shoe}
        <Card bgcolor="white" border="none" on:openDrawer={() => getShoeDetails(shoe)}>
            <img class="shoe-image" src={shoe.image} alt={shoe.name}/>
        </Card>
        {/each}
    </section>
</main>
<Footer />
{#if isDrawerOpen}
<div class="overlay" on:click={toggleDrawer} />
<Drawer on:closeDrawer={toggleDrawer}>
	<div style="text-align: left">
		<p>{details.title}</p>
		<p>{@html details.description}</p>
		<div style="display: flex; flex-direction: row; flex-wrap: wrap; margin: 5px; align-items: flex-start; justify-content: space-between;">
			{#each details.variants as variant}
				<Card width="100px" height="40px" margin="1px">
					<span>Size: {variant.size}</span>
					<span>${variant.price}</span>
				</Card>
			{/each}
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
		justify-content: space-between;
	}

	.flex-col {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.shoe-image {
		object-fit: contain;
		width: 80%;
	}

	.overlay {
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,.85);
		top: 0;
		left: 0;
		z-index: 400;
	}

	.overlay:hover {
		cursor: pointer;  
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>