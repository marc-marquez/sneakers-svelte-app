<script>
    export let style;
    export let classes;
    export let handleClick;
    export let disabled;
</script>

<button class="{classes ? classes : 'circle-button'}" {style} on:click={handleClick} {disabled}>
    <slot></slot>
</button>

<style>
    .circle-button {
		background-color: black;
		border: 2px solid black;
		width: 50px;
		height: 50px;
		border-radius: 50%;
        color: white;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 30px;
	}

	.circle-button:hover {
		cursor: pointer;
		border: 2px solid #a6f0ff;
		background-color: #a6f0ff;
		color: black;
	}

	.circle-button:disabled {
		cursor: not-allowed;
		border: 2px solid lightgrey;
		background-color: lightgrey;
		color: white;
	}
</style>