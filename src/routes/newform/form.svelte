<script lang="ts">
    import * as Card from '$lib/components/ui/card/index.js';
    import * as Form from '$lib/components/ui/form/index.js';
    import { Input } from '$lib/components/ui/input/index.js';
    import * as Select from '$lib/components/ui/select/index.js'
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

    let nurseSelectedIdType = $state('');

    const triggerContent = $derived(
        nationalIdTypes.find((f) => f.abbreviation === nurseSelectedIdType)?.label ?? '...'
    );

    let driverSelectedIdType = $state('');

    const driverTriggerContent = $derived(
        nationalIdTypes.find((f) => f.abbreviation === driverSelectedIdType)?.label ?? '...'
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
                <Card.Root  class="w-[580px]">
                    <Card.Header>
                      <Card.Title>Información personal enfermero</Card.Title>
                    </Card.Header>
                    <Card.Content>
                        <Form.Field {form} name="nurseIdType">
                            <Form.Control>
                                {#snippet children({ props })}
                                    <Form.Label>Tipo de documento</Form.Label>
                                    <Select.Root type="single" name="nationalIdType" bind:value={nurseSelectedIdType}>
                                        <Select.Trigger class="w-[180px]">
                                            {triggerContent}
                                        </Select.Trigger>
                                        <Select.Content>
                                            <Select.Group>
                                                {#each nationalIdTypes as item}
                                                    <Select.Item value={item.abbreviation} label={item.label}>{item.label}</Select.Item>
                                                {/each}
                                            </Select.Group>
                                        </Select.Content>
                                    </Select.Root>
                                {/snippet}
                            </Form.Control>
                            <Form.FieldErrors />
                        </Form.Field>
                        <Form.Field {form} name="nurseIdNumber">
                            <Form.Control>
                                {#snippet children({ props })}
                                    <Form.Label>Número de documento de documento</Form.Label>
                                    <Input {...props} bind:value={$formData.nurseIdNumber} />
                                {/snippet}
                            </Form.Control>
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
                            <Form.FieldErrors />
                        </Form.Field>

                        <Form.Field {form} name="nurseFirstSurname">
                            <Form.Control>
                                {#snippet children({ props })}
                                    <Form.Label>Primer apellido</Form.Label>
                                    <Input {...props} bind:value={$formData.nurseFirstSurname} />
                                {/snippet}
                            </Form.Control>
                            <Form.FieldErrors />
                        </Form.Field>

                        <Form.Field {form} name="nurseSecondSurname">
                            <Form.Control>
                                {#snippet children({ props })}
                                    <Form.Label>Segundo apellido</Form.Label>
                                    <Input {...props} bind:value={$formData.nurseSecondSurname} />
                                {/snippet}
                            </Form.Control>
                            <Form.FieldErrors />
                        </Form.Field>
                    </Card.Content>
                  </Card.Root>
                  <Card.Root class="w-[580px]">
                    <Card.Header>
                      <Card.Title>Información conductor</Card.Title>
                    </Card.Header>
                    <Card.Content>
                        <Form.Field {form} name="driverIdType">
                            <Form.Control>
                                {#snippet children({ props })}
                                    <Form.Label>Tipo de documento</Form.Label>
                                    <Select.Root type="single" name="nationalIdType" bind:value={driverSelectedIdType}>
                                        <Select.Trigger class="w-[180px]">
                                            {driverTriggerContent}
                                        </Select.Trigger>
                                        <Select.Content>
                                            <Select.Group>
                                                {#each nationalIdTypes as item}
                                                    <Select.Item value={item.abbreviation} label={item.label}>{item.label}</Select.Item>
                                                {/each}
                                            </Select.Group>
                                        </Select.Content>
                                    </Select.Root>
                                {/snippet}
                            </Form.Control>
                            <Form.FieldErrors />
                        </Form.Field>
                        <Form.Field {form} name="driverIdNumber">
                            <Form.Control>
                                {#snippet children({ props })}
                                    <Form.Label>Número de documento de documento</Form.Label>
                                    <Input {...props} bind:value={$formData.driverIdNumber} />
                                {/snippet}
                            </Form.Control>
                            <Form.FieldErrors />
                        </Form.Field>

                        <Form.Field {form} name="driverFirstName">
                            <Form.Control>
                                {#snippet children({ props })}
                                    <Form.Label>Primer nombre</Form.Label>
                                    <Input {...props} bind:value={$formData.driverFirstName} />
                                {/snippet}
                            </Form.Control>
                            <!-- <Form.Description></Form.Description>  -->
                            <Form.FieldErrors />
                        </Form.Field>
                        <Form.Field {form} name="driverSecondName">
                            <Form.Control>
                                {#snippet children({ props })}
                                    <Form.Label>Segundo nombre</Form.Label>
                                    <Input {...props} bind:value={$formData.driverSecondName} />
                                {/snippet}
                            </Form.Control>
                            <Form.FieldErrors />
                        </Form.Field>

                        <Form.Field {form} name="driverFirstSurname">
                            <Form.Control>
                                {#snippet children({ props })}
                                    <Form.Label>Primer apellido</Form.Label>
                                    <Input {...props} bind:value={$formData.driverFirstSurname} />
                                {/snippet}
                            </Form.Control>
                            <Form.FieldErrors />
                        </Form.Field>

                        <Form.Field {form} name="driverSecondSurname">
                            <Form.Control>
                                {#snippet children({ props })}
                                    <Form.Label>Segundo apellido</Form.Label>
                                    <Input {...props} bind:value={$formData.driverSecondSurname} />
                                {/snippet}
                            </Form.Control>
                            <Form.FieldErrors />
                        </Form.Field>

                    </Card.Content>
                  </Card.Root>

                  <Card.Root class="w-[580px]">
                    <Card.Header>
                      <Card.Title>Vehículo de emergencia</Card.Title>
                    </Card.Header>
                    <Card.Content>
                        <Form.Field {form} name="ambulancePlate">
                            <Form.Control>
                                {#snippet children({ props })}
                                    <Form.Label>Placa</Form.Label>
                                    <Input {...props} bind:value={$formData.ambulancePlate} />
                                {/snippet}
                            </Form.Control>
                            <Form.FieldErrors />
                        </Form.Field>
                    </Card.Content>
                  </Card.Root>
            </Tabs.Content>
            <Tabs.Content value="patientInfo"></Tabs.Content>
            <Tabs.Content value="patientHealthStatus">INFO PACIENTE</Tabs.Content>
        </Tabs.Root>
    </div>
</form>
