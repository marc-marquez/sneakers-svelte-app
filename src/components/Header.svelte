<script>
    export let name;
    export let color = "black";
</script>

<header>
    <h1 style="color: {color}">{name}</h1>
</header>

<style>
    header {
        position: relative;
        top: 0;
        text-align: center;
        padding: 10px
    }
</style>