<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from "mode-watcher";
	import DarkModeSwitch from './DarkModeSwitch.svelte';
	let { children } = $props();
</script>

<ModeWatcher />
<DarkModeSwitch />
<div class="flex min-h-screen justify-center px-4 sm:px-0">
	<div class="my-8 w-full max-w-2xl">
		{@render children()}
	</div>
</div>
