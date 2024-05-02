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
    import Toast from './shared/Toast.svelte';

	import DISPLAY_FORMAT from './constants/DisplayFormats';
	import BRANDS from './constants/Brands';
    import ShoeVariants from './shared/ShoeVariants.svelte';
    import ShoeActions from './shared/ShoeActions.svelte';

	let brands = BRANDS;
    let shoes = [];
	let originalShoes = [];
    let totalPages: number = 0;
    let currentPage: number = 1;
    let currentBrand = brands[0];
    let isDetailsDrawerOpen = false;
	let isCartOpen = false;
	let isLoading = false;
	let successToast = false;

	let currentShoeIndex = 0;
	let currentShoeSize = '';
	let currentShoeVariant: number = null;

	$: currentShoe = shoes[currentShoeIndex];
	$: currentShoeId = currentShoe?.id;

	let displayFormat: string = DISPLAY_FORMAT.featured;
	let currentGender = 'any';
	let currentAgeGroup = 'adults';
	
	// DOCUMENTATION - https://stockx.vlour.me/
	const getData = (brand, page, gender, age, size) => {
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
					shoe.rating = Math.floor(Math.random() * 6);
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
        getData(currentBrand, currentPage, currentGender, currentAgeGroup, currentShoeSize);
    };

	const toggleDetailsDrawer = () => {
        isDetailsDrawerOpen = !isDetailsDrawerOpen;
    };

	const getShoeDetails = (e) => {
		isDetailsDrawerOpen = true;
		currentShoeId = e.detail;
	}

	const getNextPage = () => {
        currentPage+=1;
        getData(currentBrand, currentPage, currentGender, currentAgeGroup, currentShoeSize);
    }

    const getPrevPage = () => {
        if (currentPage > 1) {
            currentPage-=1;
        }

        getData(currentBrand, currentPage, currentGender, currentAgeGroup, currentShoeSize);
    }

	onMount(() => {
		setBrandAndGet(currentBrand);
	});

	const setVariant = (e) => {
		console.log(e.detail);
		currentShoeVariant = e.detail;
	}

	const nextShoe = () => {
		currentShoeIndex++;
		currentShoeVariant = null;

		// Get next batch of shoes
		if (currentShoeIndex === shoes.length -1 ) {
			currentPage+=1;
			getData(currentBrand, currentPage, currentGender, currentAgeGroup, currentShoeSize);
		}
	}

	const prevShoe = () => {
		currentShoeIndex--;
		currentShoeVariant = null;
	}

	const setGender = (e) => {
		currentGender = e.detail;
		getData(currentBrand, 1, currentGender, currentAgeGroup, currentShoeSize);
	}

	const setAgeGroup = (e) => {
		currentAgeGroup = e.detail;
		getData(currentBrand, 1, currentGender, currentAgeGroup, currentShoeSize);
	}

	const setShoeSize = (e) => {
		currentShoeSize = e.detail;
		getData(currentBrand, 1, currentGender, currentAgeGroup, currentShoeSize);
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

	const fireSuccessToast = () => {
		successToast = true;
		setTimeout(() => {
			successToast = false;
		}, 3000);
	};

	const getShoeById = (id) => {
		if (!id) { 
			console.error('No id sent in getShoeById');
			return; 
		}

		let found = shoes.find((shoe) => shoe.id === id);
		
		if (!found) {
			console.error('No shoe found in getShoeById');
			return; 
		}

		return found;
	};
</script>

<Header name="The Drip" on:displayFormatChange={setDisplayFormat} on:openCart={openCart}/>
<PageLayout>
	<main>
		<div class="container">
			<div style="background-color: white; padding: 10px; margin: 10px;">
				<h1 style="text-align: center;">Select Brand</h1>
				<Brands {brands} {currentBrand} on:handleSetBrand={(e) => setBrandAndGet(e.detail)} />
				<h1 class="hide-show-titles" style="text-align: center;">Filters</h1>
				<Filters {currentShoeSize} {currentGender} on:sizeChange={setShoeSize} on:genderChange={setGender} on:ageGroupChange={setAgeGroup} />
			</div>
			{#if isLoading}
				<div style="flex:2 1 0%; background-color: white; margin: 10px;">
					<LoadingState />
				</div>
			{:else if displayFormat === 'featured'}
				<div style="flex:2 1 0%; background-color: white; margin: 10px; position: relative; top: -30px;">
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
						<RowContainer style="flex-wrap: wrap; margin-bottom: 10px; justify-content: center;">
							<h1 style="text-align: center; margin-bottom: 0">{shoes[currentShoeIndex].title}</h1>
						</RowContainer>
						<RowContainer style="flex-wrap: wrap; margin-bottom: 30px; justify-content: center;">
							<StarRating currentRating={currentShoe?.rating} />
						</RowContainer>
						{/if}
						{#if shoes[currentShoeIndex]?.variants}
						<RowContainer style="width: 50%; flex-wrap: wrap; margin-bottom: 30px; justify-content: center; align-items: center;">
							<ShoeVariants shoe={currentShoe} on:setVariant={setVariant} />
						</RowContainer>
						{/if}
						<RowContainer style="width: 50%; flex-wrap: wrap;">
							<ShoeActions shoe={currentShoe} {currentShoeVariant} on:toggleDetailsDrawer={toggleDetailsDrawer} on:fireSuccessToast={fireSuccessToast} />
						</RowContainer>
					</div>
				</div>
			{:else if displayFormat === 'grid'}
				<div style="flex:2 1 0%; background-color: white; margin: 10px;">
					<ShoeGrid {shoes} {currentPage} {totalPages} on:getNextPage={getNextPage} on:getPrevPage={getPrevPage} on:getShoeDetails={getShoeDetails} />
				</div>
			{:else if displayFormat === 'list'}
				<div style="flex:2 1 0%; background-color: white; margin: 10px;">
					<ShoeList {shoes} />
				</div>
			{:else if shoes.length === 0 && !isLoading}
				<EmptyState />
			{/if}
		</div>
		
	</main>

	{#if isDetailsDrawerOpen}
		<ShoeDrawer shoe={getShoeById(currentShoeId)} {currentShoeVariant} on:toggleDetailsDrawer={toggleDetailsDrawer} {isDetailsDrawerOpen} on:setVariant={setVariant} on:fireSuccessToast={fireSuccessToast}/>
	{/if}

	{#if isCartOpen}
		<CartDrawer {isCartOpen} {toggleCart} />
	{/if}

	{#if successToast}
		<Toast type="success" message={`Added ${currentShoe.title} (size ${currentShoe.variants?.[currentShoeVariant]?.size}) to cart.`} />
	{/if}
</PageLayout>
<!-- <Footer /> -->

<style>
	main {
		display: flex;
		flex-direction: column;
		margin-top: 40px;
		width: 100%;
	}

	.container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: start;
		flex-wrap: nowrap;
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

		main {
			margin-top: 20px;
		}
	}
</style>