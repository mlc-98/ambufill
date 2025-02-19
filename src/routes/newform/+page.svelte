<script lang="ts">
	import type { PageData } from './$types.js';
	import Form from './Form.svelte';
	let { data }: { data: PageData } = $props();
</script>

<Form {data} />
