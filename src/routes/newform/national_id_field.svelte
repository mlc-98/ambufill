<script lang="ts">
    import * as Select from '$lib/components/ui/select/index.js';
    import { nationalIdType } from './primitives';
    type internalType = typeof nationalIdType;
    type internalTypeArray = internalType[];
    let { bindedValue, action, items }: { items: internalTypeArray } = $props();
</script>

<Select.Root type="single" name="nationalIdType" bind:value={bindedValue}>
    <Select.Trigger class="w-[180px]">
        {action}
    </Select.Trigger>
    <Select.Content>
        <Select.Group>
            {#each items as item}
                <Select.Item value={item.abbreviation} label={item.label}>{item.label}</Select.Item>
            {/each}
        </Select.Group>
    </Select.Content>
</Select.Root>
