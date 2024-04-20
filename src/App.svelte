<script>
	import Header from "./components/Header.svelte";
	import Footer from "./components/Footer.svelte";
	import Card from "./components/Card.svelte";

    let brands = ['Nike', 'Adidas', 'New Balance', 'Converse', 'Reebok'];

</script>

<Header name="Sneaks"/>
<main>
	<section class="flex-row flex-wrap">
        {#each brands as brand}
        <Card>
            <div class="flex-row">
                <img class="brand-image" src="{`https://logo.clearbit.com/${brand.replace(/\s+/g, '')}.com`}?size=75" />
            </div>
        </Card>
        {/each}
    </section>
</main>
<Footer />

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

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>