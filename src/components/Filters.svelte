<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";
    import FilterAgeGroup from "./FilterAgeGroup.svelte";
    import FilterGender from "./FilterGender.svelte";
    import FilterSize from "./FilterSize.svelte";

    export let currentShoeSize: string = 'any';
    export let currentGender: string = 'any';
    export let currentAgeGroup: string = 'adults';
   
    let dispatch = createEventDispatcher();

    const genderChange = (e) => {
        dispatch('genderChange', e.detail);
    }

    const ageGroupChange = (e) => {
        dispatch('ageGroupChange', e.detail);
    }

    const sizeChange = (e) => {
        dispatch('sizeChange', e.detail);
    }
</script>

<div class="container">
    <FilterAgeGroup {currentAgeGroup} on:ageGroupChange={ageGroupChange} />
    <FilterGender {currentGender} on:genderChange={genderChange} />
    <FilterSize {currentShoeSize} on:sizeChange={sizeChange} />
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        padding: 10px;
        justify-content: center;
    }

    @media (max-width: 960px) {
        .container {
            max-width: 100%;
            flex-direction: row;
            flex-wrap: wrap;
        }
    }
</style>