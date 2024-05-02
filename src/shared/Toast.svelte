<script lang="ts">
    import { fly } from 'svelte/transition'
    export let message: string = 'test message';
    export let type: string = '';
</script>

<div class="toast {type}" in:fly={{ y: -20, duration: 2000 }} out:fly={{ y: 20, duration: 2000 }}>
    <p style="margin: 0;">{message}</p>
</div>

<style>
    .toast {
        position: absolute;
        top: 1vh;
        width: 300px;
        height: 40px;
        padding: 10px 20px;
        background-color: darkgrey;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .success {
        background-color: darkseagreen;
        color: white;
    }

    .failure {
        background-color: darkred;
        color: white;
    }
</style>