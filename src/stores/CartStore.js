import { writable } from "svelte/store";

const CartStore = writable([
    {
        "id": "3715c310-f684-4e50-beb0-7ec14f1bc462",
        "title": "Nike ACG Air Mada Low Triple Black",
        "image": "https://images.stockx.com/images/Nike-ACG-Air-Mada-Triple-Black-Product.jpg",
        "size": "8.5",
        "price": 303
    },
    {
        "id": "407fdf6b-d197-4051-82fa-9456f19d93d8",
        "title": "StockX Vault NFT Puma MB.01 LaMelo Ball Rick and Morty - US M 10 Vaulted Goods",
        "image": "https://images.stockx.com/images/puma-mb-01-lamelo-ball-rick-and-morty-vault-nft-bce44af7-a48b-4fdd-89f5-96d1e73bcb26.jpg",
        "size": "10",
        "price": 410
    },
    {
        "id": "2494d704-e6d1-41aa-906b-71e5f3b22ce8",
        "title": "Converse One Star Ox Tyler the Creator Golf le Fleur Red Blue",
        "image": "https://images.stockx.com/images/Converse-One-Star-Ox-Tyler-The-Creator-Golf-Le-Fleur-Red-Blue-Product.jpg",
        "size": "10",
        "price": 298
    },
    {
        "id": "3715c310-f684-4e50-beb0-7ec14f1bc462",
        "title": "Nike ACG Air Mada Low Triple Black",
        "image": "https://images.stockx.com/images/Nike-ACG-Air-Mada-Triple-Black-Product.jpg",
        "size": "14",
        "price": 260
    }
]);

export default CartStore;