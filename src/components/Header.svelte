<script>
    export let name;
    export let color = "black";
</script>

<header>
    <h1 style="color: {color}">{name}</h1>
</header>

<style>
    header {
        text-align: center;
        font-size: 5rem;
        background-color: #a6f0ff;
        width: 100%;
    }
</style>