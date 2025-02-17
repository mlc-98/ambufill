<script lang="ts">
    import * as Form from '$lib/components/ui/form/index.js';
    import { Input } from '$lib/components/ui/input/index.js';
    import * as Tabs from '$lib/components/ui/tabs/index.js';
    import { formSchema, type FormSchema } from './schema';
    import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
    import { zodClient } from 'sveltekit-superforms/adapters';

    let { data }: { data: { form: SuperValidated<Infer<FormSchema>> } } = $props();

    const form = superForm(data.form, {
        validators: zodClient(formSchema)
    });

    const { form: formData, enhance } = form;

    const nationalIdTypes = [
        { abbreviation: 'CC', label: 'Cédula de ciudadanía' },
        { abbreviation: 'CE', label: 'Cédula de extranjería' },
        { abbreviation: 'PA', label: 'Pasaporte' },
        { abbreviation: 'RC', label: 'Registro civil' }
    ];

    let selectedIdType = $state('');

    const triggerContent = $derived(
        nationalIdTypes.find((f) => f.abbreviation === selectedIdType)?.label ?? '...'
    );
</script>

<form method="POST" use:enhance>
    <div class="hero m-8 min-h-screen">
        <Tabs.Root>
            <Tabs.List>
                <Tabs.Trigger value="crewInfo">Equipo de emergencias</Tabs.Trigger>
                <Tabs.Trigger value="patientInfo">Información personal paciente</Tabs.Trigger>
                <Tabs.Trigger value="patientHealthStatus">Condición de salud paciente</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="crewInfo">
                <Form.Field {form} name="nurseIdType">
                    <Form.Control>
                        {#snippet children({ props })}
                            <Form.Label>Tipo de documento</Form.Label>
                        {/snippet}
                    </Form.Control>
                    <!-- <Form.Description></Form.Description>  -->
                    <Form.FieldErrors />
                </Form.Field>

                <Form.Field {form} name="nurseFirstName">
                    <Form.Control>
                        {#snippet children({ props })}
                            <Form.Label>Primer nombre</Form.Label>
                            <Input {...props} bind:value={$formData.nurseFirstName} />
                        {/snippet}
                    </Form.Control>
                    <!-- <Form.Description></Form.Description>  -->
                    <Form.FieldErrors />
                </Form.Field>

                <Form.Field {form} name="nurseSecondName">
                    <Form.Control>
                        {#snippet children({ props })}
                            <Form.Label>Segundo nombre</Form.Label>
                            <Input {...props} bind:value={$formData.nurseSecondName} />
                        {/snippet}
                    </Form.Control>
                    <!-- <Form.Description></Form.Description>  -->
                    <Form.FieldErrors />
                </Form.Field>
            </Tabs.Content>
            <Tabs.Content value="patientInfo">Change your password here.</Tabs.Content>
            <Tabs.Content value="patientHealthStatus">INFO PACIENTE</Tabs.Content>
        </Tabs.Root>
    </div>
</form>
