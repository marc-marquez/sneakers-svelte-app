import { writable } from "svelte/store";

const CurrentShoeStore = writable({
    shoe: {},
    variant: {},
    variantIndex: -1
});

export default CurrentShoeStore;