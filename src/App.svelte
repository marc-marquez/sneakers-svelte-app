<script lang="ts">
	import { onMount } from 'svelte';

	import Header from "./shared/Header.svelte";
	import Brands from './components/Brands.svelte';
	import ColumnContainer from './shared/ColumnContainer.svelte';
    import RowContainer from './shared/RowContainer.svelte';
	import ShoeFeatured from './components/ShoeFeatured.svelte';
    import Filters from './components/Filters.svelte';
    import ShoeGrid from './components/ShoeGrid.svelte';
    import ShoeList from './components/ShoeList.svelte';
    import PageLayout from './shared/PageLayout.svelte';
    import ShoeDrawer from './components/ShoeDrawer.svelte';

	import FavoriteButton from './shared/FavoriteButton.svelte';
    import StarRating from './shared/StarRating.svelte';
    import AddToCart from './shared/AddToCart.svelte';
    import CircleButton from './shared/CircleButton.svelte';
    import LoadingState from './shared/LoadingState.svelte';
    import EmptyState from './shared/EmptyState.svelte';
    import CartDrawer from './components/CartDrawer.svelte';

    let brands = ['Nike', 'Jordan', 'Adidas', 'New Balance', 'Converse', 'Reebok', 'Puma', 'Fila'];
    let shoes = [];
	let originalShoes = [];
    let totalPages = 0;
    let currentPage = 1;
    let currentBrand = brands[0];
    let isDetailsDrawerOpen = false;
	let isCartOpen = false;
	let isLoading = false;

	let currentShoeIndex = 0;
	let currentShoeSize = '';
	let currentShoeVariant = '';

	$: currentShoe = shoes[currentShoeIndex];

	let displayFormat = 'featured';
	let currentGender = 'any';
	let currentAgeGroup = 'adults';
	

	// DOCUMENTATION - https://stockx.vlour.me/
	const getShoes = (brand, page, gender, age, size) => {
		isLoading = true;
        fetch(`https://api.stockx.vlour.me/search?query=${brand} ${age} ${gender} ${size ? `size ${size}` : '' } shoes&page=${page}`)
            .then(response => response.json())
            .then(data => {				
				if (currentPage === 1) {
					originalShoes = [...data.hits];
					currentShoeIndex = 0;
				} else {
                	originalShoes = [...originalShoes, ...data.hits];
				}

                totalPages = data.pages;
				
				originalShoes.forEach(shoe => {
					shoe.variants.forEach(variant => {
						variant.size = variant.size.replace(/[YCWK]/g, '');
					});
					
					shoe.variants.sort((a, b) => a.size - b.size);
				});

				shoes = originalShoes;
				currentShoeVariant = null;
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
        getShoes(currentBrand, currentPage, currentGender, currentAgeGroup, currentShoeSize);
    };

	const toggleDetailsDrawer = () => {
        isDetailsDrawerOpen = !isDetailsDrawerOpen;
    }

	const getShoeDetails = (e) => {
		isDetailsDrawerOpen = true;
		currentShoeIndex = e.detail;
	}

	const getNextPage = () => {
        currentPage+=1;
        getShoes(currentBrand, currentPage, currentGender, currentAgeGroup, currentShoeSize);
    }

    const getPrevPage = () => {
        if (currentPage > 1) {
            currentPage-=1;
        }

        getShoes(currentBrand, currentPage, currentGender, currentAgeGroup, currentShoeSize);
    }

	onMount(() => {
		setBrandAndGet(currentBrand);
	});

	const setVariant = (event) => {
		if (currentShoeVariant === event.target.value) {
			currentShoeVariant = null;
			return;
		}

		currentShoeVariant = event.target.value;
	}

	const nextShoe = () => {
		currentShoeIndex++;
		currentShoeVariant = null;

		if (currentShoeIndex === shoes.length -1 ) {
			currentPage+=1;
			getShoes(currentBrand, currentPage, currentGender, currentAgeGroup, currentShoeSize);
		}
	}

	const prevShoe = () => {
		currentShoeIndex--;
		currentShoeVariant = null;
	}

	const setGender = (e) => {
		currentGender = e.detail;
		getShoes(currentBrand, 1, currentGender, currentAgeGroup, currentShoeSize);
	}

	const setAgeGroup = (e) => {
		currentAgeGroup = e.detail;
		getShoes(currentBrand, 1, currentGender, currentAgeGroup, currentShoeSize);
	}

	const setShoeSize = (e) => {
		currentShoeSize = e.detail;
		getShoes(currentBrand, 1, currentGender, currentAgeGroup, currentShoeSize);
	}

	const setDisplayFormat = (e) => {
		displayFormat = e.detail;
	}

	const openCart = () => {
		console.log('open drawer to cart');
		isCartOpen = true;
	}

	const toggleCart = () => {
		isCartOpen = !isCartOpen;
	}
</script>

<PageLayout>
	<Header name="The Drip" on:displayFormatChange={setDisplayFormat} on:openCart={openCart}/>
	<main>
		<div class="container">
			<div>
				<h1 style="text-align: center;">Select Brand</h1>
				<Brands {brands} {currentBrand} on:handleSetBrand={(e) => setBrandAndGet(e.detail)} />
			</div>
			{#if isLoading}
				<LoadingState />
			{:else if displayFormat === 'featured'}
				<ColumnContainer>
					<div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
						<ShoeFeatured {currentShoe} {isLoading} {currentBrand} on:getNextShoe={nextShoe} on:getPrevShoe={prevShoe}/>
						<RowContainer style="flex-wrap: nowrap; align-items: center; justify-content: center;">
							<CircleButton handleClick={() => prevShoe()} disabled={currentShoeIndex <= 0}>
								<i class="fas fa-chevron-left" />
							</CircleButton>
							<CircleButton handleClick={() => nextShoe()} disabled={currentShoeIndex >= shoes.length - 1}>
								<i class="fas fa-chevron-right" />
							</CircleButton>
						</RowContainer>
						{#if shoes[currentShoeIndex]?.title}
						<RowContainer style="width: 90%; flex-wrap: wrap; margin-bottom: 10px; justify-content: center;">
							<h1 style="text-align: center;">{shoes[currentShoeIndex].title}</h1>
						</RowContainer>
						{/if}
						{#if shoes[currentShoeIndex]?.variants}
						<RowContainer style="width: 90%; flex-wrap: wrap; margin-bottom: 30px; justify-content: center;">
							{#each shoes[currentShoeIndex].variants as variant, i (i)}
								<button class="variant-button {i.toString() === currentShoeVariant ? 'selected' : ''}" value={i} on:click={(i) => setVariant(i)}>{variant.size}</button>
							{/each}
						</RowContainer>
						{/if}
						<RowContainer style="width: 90%; flex-wrap: wrap;">
							<button style="border: none; background-color: white; font-size: 24px;" on:click={() => toggleDetailsDrawer()}><i class="fa-solid fa-circle-info"></i></button>
							<StarRating />
							<FavoriteButton />
							<AddToCart {currentShoe} {currentShoeVariant} />
							{#if shoes[currentShoeIndex]?.variants[currentShoeVariant]?.price}
								<h2 style="margin:0;padding:0;">${shoes[currentShoeIndex].variants[currentShoeVariant]?.price}</h2>
							{:else}
								<h2 style="margin:0;padding:0;">$</h2>
							{/if}
						</RowContainer>
					</div>
				</ColumnContainer>
			{:else if displayFormat === 'grid'}
				<ShoeGrid {shoes} {currentPage} {totalPages} on:getNextPage={getNextPage} on:getPrevPage={getPrevPage} on:getShoeDetails={getShoeDetails} />
			{:else if displayFormat === 'list'}
				<ShoeList {shoes} />
			{:else if shoes.length === 0 && !isLoading}
				<EmptyState />
			{/if}
			<div style="margin-bottom: 20px;">
				<h1 class="hide-show-titles" style="text-align: center;">Filters</h1>
				<Filters {currentShoeSize} {currentGender} on:sizeChange={setShoeSize} on:genderChange={setGender} on:ageGroupChange={setAgeGroup} />
			</div>
		</div>
		
	</main>
	<!-- <Footer /> -->
	{#if isDetailsDrawerOpen}
	<ShoeDrawer shoe={shoes[currentShoeIndex]} on:toggleDetailsDrawer={toggleDetailsDrawer} {isDetailsDrawerOpen} />
	{/if}

	{#if isCartOpen}
	<CartDrawer {isCartOpen} {toggleCart} />
	{/if}
</PageLayout>

<style>
	main {
		display: flex;
		flex-direction: column;
		margin-top: 10px;
		width: 100%;
	}

	.container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: start;
		flex-wrap: nowrap;
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

	@media (max-width: 960px) {
		.container {
			flex-direction: column;
			align-items: center;
			padding: 0 10px;
		}

		.hide-show-titles {
			display: none;
		}
	}
</style>