<script>
	import { fade, fly } from 'svelte/transition';
	import { onMount } from 'svelte';

	import Header from "./shared/Header.svelte";
	import Footer from "./shared/Footer.svelte";
	import Card from "./shared/Card.svelte";
	import Drawer from "./shared/Drawer.svelte";
	import Brands from './components/Brands.svelte';
	import ColumnContainer from './shared/ColumnContainer.svelte';
    import RowContainer from './shared/RowContainer.svelte';
	import ShoeFeatured from './components/ShoeFeatured.svelte';
    import Customization from './components/Customization.svelte';
    import ShoeGrid from './components/ShoeGrid.svelte';
    import ShoeList from './components/ShoeList.svelte';

    let brands = ['Nike', 'Jordan', 'Adidas', 'New Balance', 'Converse', 'Reebok', 'Puma', 'Fila'];
    let shoes = [];
    let totalPages = 0;
    let currentPage = 1;
    let currentBrand = '';
    let details;
    let isDrawerOpen = false;
	let isLoading = false;

	let currentShoeIndex = 0;
	let currentShoeVariant = 0;

	let containerHeight;
  	let imageHeight;

	let displayFormat = 'featured';

	const getShoes = (brand, page=1) => {
		isLoading = true;
        fetch(`https://api.stockx.vlour.me/search?query=${brand} sneakers&page=${page}`)
            .then(response => response.json())
            .then(data => {
                shoes = data.hits;
                totalPages = data.pages;
				console.log(shoes);
				

				shoes.forEach(shoe => {
					shoe.variants.forEach(variant => {
						variant.size = variant.size.replace(/[YCWK]/g, '');
					});
					
					shoe.variants.sort((a, b) => a.size - b.size);
				});

				currentShoeIndex = 0;
				currentShoeVariant = 0;
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
        isDrawerOpen = true;
        details = shoe;

		details.variants.forEach(variant => {
			variant.size = variant.size.replace(/[YCWK]/g, '');
		});
		
		details.variants.sort((a, b) => a.size - b.size);
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

	const animateImage = () => {
		const image = document.getElementsByClassName('drawer-shoe-image')[0];
		const container = document.getElementsByClassName('drawer-shoe-image-container')[0];

		containerHeight = container.clientHeight;
		imageHeight = image.clientHeight;

		if (containerHeight > imageHeight) {
			// Fall animation
			image.style.top = `${containerHeight - imageHeight}px`;

			// Bounce animation
			setTimeout(() => {
				image.style.transform = 'translateX(-50%) translateY(-50px)'; // Bounce up
				setTimeout(() => {
					image.style.transform = 'translateX(-50%) translateY(0)'; // Bounce back to original position
				}, 500); // Wait for the bounce up animation to complete
			}, 500); // Wait for the fall animation to complete
		}
	}

	onMount(() => {
		getShoes(brands[0]);
		const container = document.getElementsByClassName('drawer-shoe-image-container')[0];
		containerHeight = container.clientHeight;
		const image = document.getElementsByClassName('drawer-shoe-image')[0];
		imageHeight = image.clientHeight;
	});

	window.addEventListener('resize', () => {
		const container = document.getElementsByClassName('drawer-shoe-image-container')[0];
		containerHeight = container.clientHeight;
		const image = document.getElementsByClassName('drawer-shoe-image')[0];
		imageHeight = image.clientHeight;
	});

	const handleDisplayFormatChange = (e) => {
		displayFormat = e.target.value;
	}

	const setVariant = (event) => {
		currentShoeVariant = event.detail;
	}

	const nextShoe = () => {
		currentShoeIndex++;
		currentShoeVariant = 0;
	}

	const prevShoe = () => {
		currentShoeIndex--;
		currentShoeVariant = 0;
	}

</script>

<div class="page-layout">
	<Header name="The Drip" on:displayFormatChange={(e) => displayFormat = e.detail}/>
	<main>
		<RowContainer style="align-items: flex-start">
			<ColumnContainer style="max-width: 200px; justify-content: flex-start">
				<h1 style="text-align: center;">Select Brand</h1>
				<Brands {brands} {currentBrand} on:handleSetBrand={(e) => setBrandAndGet(e.detail)}/>
			</ColumnContainer>
			{#if displayFormat === 'featured' && !isLoading}
				<ShoeFeatured {shoes} {currentShoeIndex} {currentShoeVariant} {isLoading} on:getNextShoe={nextShoe} on:getPrevShoe={prevShoe}/>
				{#if shoes[currentShoeIndex]?.variants }
					<Customization variants={shoes[currentShoeIndex].variants} {currentShoeVariant} on:setVariant={(e) => setVariant(e)} />
				{/if}
			{:else if displayFormat === 'grid' && !isLoading}
				<ShoeGrid {shoes} {currentPage} {totalPages} on:getNextPage={getNextPage} on:getPrevPage={getPrevPage}/>
			{:else if displayFormat === 'list' && !isLoading}
				<ShoeList {shoes} />
			{/if}
		</RowContainer>
	</main>
	<!-- <Footer /> -->
	{#if isDrawerOpen}
	<Drawer on:closeDrawer={toggleDrawer} {isDrawerOpen} on:animateImage={animateImage}>
		<div class="flex-row shoe-details">
			<div class="drawer-shoe-image-container">
				<img class="drawer-shoe-image" src="{details.image}" alt={details.title} style="max-width: 400px"/>
			</div>
			<div style="flex-grow: 2">
				<h1>{details.title}</h1>
				{#if details.description}
					<p style="padding: 10px">{@html details.description}</p>
				{:else}
					<p style="width: 100%; overflow-y: auto;">No description available</p>
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
</div>

<style>
	.page-layout {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 0 auto;
		padding: 20px 50px;
	}

	main {
		display: flex;
		flex-direction: column;
		margin-top: 50px;
		width: 100%;
	}

	/* .flex-wrap {
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
	} */

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