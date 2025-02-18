<script lang="ts">
    import * as Card from '$lib/components/ui/card/index.js';
    import * as Form from '$lib/components/ui/form/index.js';
    import * as Select from '$lib/components/ui/select/index.js';
    import type { EmergencyCrewSchema } from './schema';

    type firstSectionType = typeof EmergencyCrewSchema;

    let { data } : {data} = $props();
</script>

<Card.Root class="w-[580px]">
    <Card.Header>
        <Card.Title class="text-xl">Información personal paciente</Card.Title>
    </Card.Header>
    <Card.Content>
        <Form.Field {form} name="nurseIdType">
            <Form.Control>
                {#snippet children({ props })}
                    <Form.Label>Tipo de documento</Form.Label>
                    <Select.Root type="single" name="nationalIdType" bind:value={data.}>
                        <Select.Trigger class="w-[180px]">
                            {triggerContent}
                        </Select.Trigger>
                        <Select.Content>
                            <Select.Group>
                                {#each nationalIdTypes as item}
                                    <Select.Item value={item.abbreviation} label={item.label}
                                        >{item.label}</Select.Item
                                    >
                                {/each}
                            </Select.Group>
                        </Select.Content>
                    </Select.Root>
                {/snippet}
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>
    </Card.Content>
</Card.Root>
