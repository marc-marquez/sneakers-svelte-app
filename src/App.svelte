<script>
	import { onMount } from 'svelte';

	import Header from "./shared/Header.svelte";
	import Brands from './components/Brands.svelte';
	import ColumnContainer from './shared/ColumnContainer.svelte';
    import RowContainer from './shared/RowContainer.svelte';
	import ShoeFeatured from './components/ShoeFeatured.svelte';
    import Customization from './components/Customization.svelte';
    import ShoeGrid from './components/ShoeGrid.svelte';
    import ShoeList from './components/ShoeList.svelte';
    import PageLayout from './shared/PageLayout.svelte';
    import ShoeDrawer from './components/ShoeDrawer.svelte';

	import FavoriteButton from './shared/FavoriteButton.svelte';
    import StarRating from './shared/StarRating.svelte';
    import AddToCart from './shared/AddToCart.svelte';
    import CircleButton from './shared/CircleButton.svelte';


    let brands = ['Nike', 'Jordan', 'Adidas', 'New Balance', 'Converse', 'Reebok', 'Puma', 'Fila'];
    let shoes = [];
    let totalPages = 0;
    let currentPage = 1;
    let currentBrand = brands[0];
    let isDrawerOpen = false;
	let isLoading = false;

	let currentShoeIndex = 0;
	let currentShoeVariant = 0;

	let containerHeight;
  	let imageHeight;

	let displayFormat = 'featured';
	let currentCategory = 'male';

	const getShoes = (brand, page=1, category) => {
		isLoading = true;
        fetch(`https://api.stockx.vlour.me/search?query=${brand} sneakers ${category}&page=${page}`)
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
        getShoes(currentBrand, currentPage, currentCategory);
    };

	const toggleDrawer = () => {
        isDrawerOpen = !isDrawerOpen;
    }

	const getShoeDetails = (e) => {
		isDrawerOpen = true;
		currentShoeIndex = e.detail;
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

	onMount(() => {
		setBrandAndGet(currentBrand);
	});

	const setVariant = (event) => {
		currentShoeVariant = event.detail;
	}

	const nextShoe = () => {
		currentShoeIndex++;
		console.log(currentShoeIndex);
		currentShoeVariant = 0;
	}

	const prevShoe = () => {
		currentShoeIndex--;
		console.log(currentShoeIndex);
		currentShoeVariant = 0;
	}

	const setCategory = (e) => {
		currentCategory = e.detail;
		console.log(currentBrand, currentCategory);
		getShoes(currentBrand, 1, currentCategory);
	}

</script>

<PageLayout>
	<Header name="The Drip" on:displayFormatChange={(e) => displayFormat = e.detail} on:categoryChange={setCategory}/>
	<main>
		<div class="container">
			<div style="flex-shrink:2">
				<h1 style="text-align: center;">Select Brand</h1>
				<Brands {brands} {currentBrand} on:handleSetBrand={(e) => setBrandAndGet(e.detail)}/>
			</div>
			{#if displayFormat === 'featured' && !isLoading}
				<ShoeFeatured {shoes} {currentShoeIndex} {currentShoeVariant} {isLoading} on:getNextShoe={nextShoe} on:getPrevShoe={prevShoe}/>
				{#if shoes[currentShoeIndex]?.variants }
					<Customization variants={shoes[currentShoeIndex].variants} {currentShoeVariant} {currentCategory} on:setVariant={(e) => setVariant(e)} on:categoryChange={setCategory} />
				{/if}
			{:else if displayFormat === 'grid' && !isLoading}
				<ShoeGrid {shoes} {currentPage} {totalPages} on:getNextPage={getNextPage} on:getPrevPage={getPrevPage} on:getShoeDetails={getShoeDetails} />
			{:else if displayFormat === 'list' && !isLoading}
				<ShoeList {shoes} />
			{/if}
		</div>
		{#if displayFormat === 'featured' && !isLoading}
		<RowContainer style="flex-wrap: nowrap; align-items: center;">
			<CircleButton handleClick={() => prevShoe()} disabled={currentShoeIndex <= 0}>
				<i class="fas fa-chevron-left" />
			</CircleButton>
			{#if shoes[currentShoeIndex]?.title}
				<h1>{shoes[currentShoeIndex].title}</h1>
			{/if}
			<CircleButton handleClick={() => nextShoe()} disabled={currentShoeIndex >= shoes.length - 1}>
				<i class="fas fa-chevron-right" />
			</CircleButton>
		</RowContainer>
		<RowContainer>
			<StarRating />
			<FavoriteButton />
			<AddToCart />
			{#if shoes[currentShoeIndex]?.variants}
				<h2>${shoes[currentShoeIndex].variants[currentShoeVariant].price}</h2>
			{/if}
		</RowContainer>
		{/if}
	</main>
	<!-- <Footer /> -->
	{#if isDrawerOpen}
	<ShoeDrawer shoe={shoes[currentShoeIndex]} on:toggleDrawer={toggleDrawer} {isDrawerOpen} />
	{/if}
</PageLayout>

<style>
	main {
		display: flex;
		flex-direction: column;
		margin-top: 50px;
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
	}
</style>