<script>
    export let bgcolor = 'black';
    export let color = 'white';
    export let margin = '10px';
    export let border = '1px solid black';
    export let width = '200px';
    export let height = '150px';
</script>

<div 
    class="card" 
    style="background-color: {bgcolor}; color: {color}; margin: {margin}; width: {width}; height: {height}"
>
    <slot></slot>
</div>

<style>
    .card {
        width: 200px;
        height: 150px;
        padding: .5px;
        border-radius: 1rem;
        border: 5px solid transparent;
        background-color: black;
        margin: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    .card:hover {
        border: 5px solid red;
        cursor: pointer;
    }
</style>