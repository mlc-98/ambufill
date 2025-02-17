<script lang="ts">
    import * as Select from '$lib/components/ui/select/index.js';
    import { nationalIdType } from './primitives';
    type internalType = typeof nationalIdType;
    type internalTypeArray = internalType[];
    let { bindedValue, action, items }: { items: internalTypeArray } = $props();
</script>
