<script>
    export let style;
    export let classes;
</script>

<div class="column-container {classes}" {style}>
    <slot></slot>
</div>

<style>
    .column-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>