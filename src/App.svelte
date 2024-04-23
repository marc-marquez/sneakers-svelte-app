<script>
	import { fade, fly } from 'svelte/transition';
	import { onMount } from 'svelte';

	import Header from "./components/Header.svelte";
	import Footer from "./components/Footer.svelte";
	import Card from "./components/Card.svelte";
	import Drawer from "./components/Drawer.svelte";

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

	const setVariant = (index) => {
		currentShoeVariant = index;
	}

</script>

<div class="page-layout">
	<Header name="The Drip" on:displayFormatChange={(e) => displayFormat = e.detail}/>
	<main>
		<div class="flex-row">
			<div class="flex-col" style="align-items: center; max-width: 200px; padding: 10px;">
				<h1 style="text-align: center;">Select Brand</h1>
				<div class="flex-col brands-container">
					{#each brands as brand (brand)}
					<button class="brand-button {currentBrand === brand ? 'selected' : ''}" on:click={() => setBrandAndGet(brand)}>
						{#if brand === 'Jordan'}
							<img class="brand-image" alt="{brand} logo" src="https://upload.wikimedia.org/wikipedia/en/thumb/3/37/Jumpman_logo.svg/250px-Jumpman_logo.svg.png" width="50"/>
						{:else}
							<img class="brand-image" alt="{brand} logo" src="{`https://logo.clearbit.com/${brand.replace(/\s+/g, '')}.com`}?size=50" />
						{/if}
					</button>
				{/each}
				</div>
			</div>
			{#if displayFormat === 'featured'}
			<div class="flex-row" style="align-items: center; justify-content: center; padding: 10px; flex: 1;">
				<!-- {#if isLoading}
				<p>Loading...</p>
				{:else} -->
				{#if shoes.length > 0 && shoes[currentShoeIndex].image && !isLoading}
				
				<button class="circle-button" on:click={() => currentShoeIndex-- } disabled={ currentShoeIndex <= 0}>
					<div>Prev</div>
				</button>
				<!-- {#if shoes.length > 0 && shoes[currentShoeIndex].image && !isLoading} -->
				<div class="flex-col flex-justify-space-between" style="align-items: center; justify-content: center; padding: 10px;">
					<div style="max-width: 800px; text-align: center">
						<img style="object-fit: contain; width: 100%" src={shoes[currentShoeIndex].image} alt={shoes[currentShoeIndex].title} in:fly={{ y: -200, duration: 2000 }} />
						<h1>{shoes[currentShoeIndex].title}</h1>
						<!-- <h2>{@html shoes[currentShoeIndex].description}</h2> -->
						<div class="flex-row flex-justify-space-between">
							<p>Stars</p>
							<p>Favorite</p>
							<p>Add to Cart</p>
							<h2>${shoes[currentShoeIndex].variants[currentShoeVariant].price}</h2>
						</div>
					</div>
				</div>
				<!-- {/if} -->
				<button class="circle-button" on:click={() => currentShoeIndex++ } disabled={ currentShoeIndex >= shoes.length - 1 }>
					<div>Nxt</div>
				</button>
				{/if}
			</div>
			<div class="flex-col" style="align-items: center; padding: 10px; max-width: 200px">
				<h1 style="text-align: center;">Customization</h1>
				<div class="flex-col" style="align-items: center;">
					<h1 style="text-align: center;">Price Slider</h1>
					{#if shoes.length > 0 && shoes[currentShoeIndex].variants}
						<h1 style="text-align: center;">Select Size</h1>
						<div class="flex-row flex-wrap" style="align-items: flex-start; width: 100%; justify-content: center;">
							{#each shoes[currentShoeIndex].variants as variant, i (variant.size)}
								<button class="variant-button {i === currentShoeVariant ? 'selected' : ''}" on:click={() => setVariant(i)}>{variant.size}</button>
							{/each}
						</div>
					{/if}
				</div>
			</div>
			{:else if displayFormat === 'grid'}
			<div class="flex-row flex-wrap" style="align-items: flex-start; justify-content: center; flex: 1;">
			{#each shoes as shoe (shoe.id)}
				{#if shoe.image}
				<Card bgcolor="white" border="none" on:openDrawer={() => getShoeDetails(shoe)}>
					{#if !isLoading}
					<div style="width: 200px;">
					<img style="object-fit: contain; width: 100%" src={shoe.image} alt={shoe.name} in:fly={{ y: -100, duration: 2000 }} />
					</div>
					{/if}
				</Card>
				{/if}
			{/each}
			</div>
			{:else if displayFormat === 'list'}
			<div class="flex-col" style="justify-content: center; align-items: flex-start; margin: 0 auto; max-width: 1920px;">	
				{#each shoes as shoe (shoe.id)}
				<div style="display: flex; flex-direction: row; justify-content: center; align-items: center; padding: 10px 30px; border-top: 5px solid #a6f0ff">
					<div style="padding: 10px;">
						<h1 style="text-align: left; margin-top: 0">{shoe.title}</h1>
						{#if shoe.description}
							<p style="text-align: left">{@html shoe.description}</p>
						{:else}
							<p style="text-align: left;">No description available</p>
						{/if}
						<div class="flex-row flex-wrap">
							{#each shoe.variants as variant}
								<Card width="80px" height="40px" margin="1px">
									<span>Size: {variant.size}</span>
									<span>${variant.price}</span>
								</Card>
							{/each}
						</div>
					</div>
					<div style="min-width: 250px; max-width: 300px; padding: 50px">
						<img style="object-fit: contain; width: 100%" src={shoe.image} alt={shoe.name} in:fly={{ x: 200, duration: 2000 }}/>
					</div>
				</div>
				{/each}
			</div>
			{/if}
		</div>
		<!-- <section class="flex-row flex-justify-end" style="padding: 10px">
			<div class="flex-row" style="justify-content: center; align-items: center; margin-right: 25px;">
				<label>
					<input type="radio" value="grid" bind:group={displayFormat} on:change={handleDisplayFormatChange}/>
					Grid
				</label>
				<label>
					<input type="radio" value="list" bind:group={displayFormat} on:change={handleDisplayFormatChange}/>
					List
				</label>
			</div>
			<button on:click={() => getPrevPage()} disabled="{currentPage < 2}">Prev</button>
			<button on:click={() => getNextPage()} disabled="{currentPage === totalPages}">Next</button>
		</section> -->
		<!-- {#if isLoading}
		<div style="display: flex; align-items: center; justify-content: center; width: 100%; height: 30vh">	
			<p>Loading...</p>
		</div>
		{:else}
			{#if displayFormat === 'grid'}
			<section class="flex-row flex-wrap" style="align-items: flex-start; justify-content: center;">
				{#each shoes as shoe (shoe.id)}
					{#if shoe.image}
					<Card bgcolor="white" border="none" on:openDrawer={() => getShoeDetails(shoe)}>
						{#if !isLoading}
						<div style="width: 200px;">
						<img style="object-fit: contain; width: 100%" src={shoe.image} alt={shoe.name} in:fly={{ y: 200, duration: 2000 }} />
						</div>
						{/if}
					</Card>
					{/if}
				{/each}
			</section>
			{:else if displayFormat === 'list'}
			<section class="flex-col" style="justify-content: center; align-items: flex-start; margin: 0 auto; max-width: 1920px;">	
				{#each shoes as shoe (shoe.id)}
				<div style="display: flex; flex-direction: row; justify-content: center; align-items: center; padding: 10px;">
					<div style="min-width: 250px; max-width: 300px; padding: 50px">
						<img style="object-fit: contain; width: 100%" src={shoe.image} alt={shoe.name} in:fly={{ x: -200, duration: 2000 }}/>
					</div>
					<div style="padding: 60px; border: 2px solid #a6f0ff; border-radius: 25px; background-color: #a6f0ff">
						<h1 style="text-align: left">{shoe.title}</h1>
						{#if shoe.description}
							<p style="text-align: left">{@html shoe.description}</p>
						{:else}
							<p style="text-align: left;">No description available</p>
						{/if}
						<div class="flex-row flex-wrap">
							{#each shoe.variants as variant}
								<Card width="100px" height="40px" margin="1px">
									<span>Size: {variant.size}</span>
									<span>${variant.price}</span>
								</Card>
							{/each}
						</div>
					</div>
				</div>
				{/each}
			</section>
			{/if}
		{/if} -->
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

	.brands-container {
		align-items: center;
		padding: 10px;
		overflow-y: auto;
	}

	.brands-container::-webkit-scrollbar {
		display: none;
	}

	main {
		display: flex;
		flex-direction: column;
		margin-top: 50px;
		width: 100%;
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

	.brand-button {
		background-color: white;
		width: 100px;
		height: 75px;
		border: none;
		margin: 10px 0;
	}

	.brand-button {
		border-left: 5px solid white;
	}

	.brand-button:hover {
		cursor: pointer;
		border-left: 5px solid lightgrey;
	}

	.brand-button.selected {
		border-left: 5px solid #a6f0ff;
	}

	.circle-button {
		background-color: black;
		border: 2px solid black;
		width: 50px;
		height: 50px;
		border-radius: 50%;
        color: white;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 30px;
	}

	.circle-button:hover {
		cursor: pointer;
		border: 2px solid #a6f0ff;
		background-color: #a6f0ff;
		color: black;
	}

	.circle-button:disabled {
		cursor: not-allowed;
		border: 2px solid lightgrey;
		background-color: lightgrey;
		color: white;
	}

	.variant-button {
		background-color: black;
		width: 40px;
		height: 40px;
		margin: 2px;
		border-radius: 50%;
		border: 2px solid black;
		color: white;
	}

	.variant-button:hover {
		cursor: pointer;
		background-color: lightgrey;
		border: 2px solid lightgrey;
		color: black;
	}

	.variant-button.selected {
		background-color: #a6f0ff;
		border: 2px solid #a6f0ff;
		color: black

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