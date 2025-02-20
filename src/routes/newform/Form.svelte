<script lang="ts">
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Legend } from 'formsnap';
	import * as RadioGroup from '$lib/components/ui/radio-group/index.js';
	import { formSchema, type FormSchema } from './schema';
	import { browser } from '$app/environment';
	import SuperDebug, { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	let {
		data
	}: {
		data: {
			form: SuperValidated<Infer<FormSchema>>;
			idTypes: Promise<IdType[]>;
		};
	} = $props();

	const form = superForm(data.form, {
		validators: zodClient(formSchema),
		dataType: 'json'
	});

	const { form: formData, enhance } = form;

	const idTypes = data.idTypes;
</script>

<form method="POST" use:enhance>
	<Accordion.Root type="single" class="w-full sm:max-w-[70%]">
		<Accordion.Item value="item-1">
			<Accordion.Trigger>Información equipo de emergencia</Accordion.Trigger>
			<Accordion.Content>
				<Card.Root>
					<Card.Header>
						<Card.Title class="text-xl font-bold">Información personal enfermero</Card.Title>
					</Card.Header>
					<Card.Content>
						<Form.Fieldset
							{form}
							name="emergencyCrew.nursePersonalInfo.idType"
							class="flex flex-col space-y-1"
						>
							<Legend class="font-bold">Tipo de documento</Legend>
							{#await idTypes}
								<p>waiting for the promise to resolve...</p>
							{:then idTypesValues}
								<RadioGroup.Root bind:value={$formData.emergencyCrew.nursePersonalInfo.idType.id}>
									{#each idTypesValues as idTypeValue}
										<Form.Control>
											{#snippet children({ props })}
											<div class="flex items-center space-x-2">
												<RadioGroup.Item
													value={idTypeValue.id}
													{...props}
												/>
												<Form.Label for={idTypeValue.id}>{idTypeValue.name}</Form.Label>
											</div>
											{/snippet}
										</Form.Control>
									{/each}
								</RadioGroup.Root>
							{:catch error}
								<p>Something went wrong: {error.message}</p>
							{/await}
							<Form.FieldErrors />
						</Form.Fieldset>

						<Form.Field {form} name="emergencyCrew.nursePersonalInfo.idNumber" class="mt-4">
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label>Número de documento</Form.Label>
									<Input
										{...props}
										bind:value={$formData.emergencyCrew.nursePersonalInfo.idNumber}
									/>
								{/snippet}
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>

						<Form.Field {form} name="emergencyCrew.nursePersonalInfo.firstName">
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label>Primer nombre</Form.Label>
									<Input
										{...props}
										bind:value={$formData.emergencyCrew.nursePersonalInfo.firstName}
									/>
								{/snippet}
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>

						<Form.Field {form} name="emergencyCrew.nursePersonalInfo.secondName">
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label>Segundo nombre</Form.Label>
									<Input
										{...props}
										bind:value={$formData.emergencyCrew.nursePersonalInfo.secondName}
									/>
								{/snippet}
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>

						<Form.Field {form} name="emergencyCrew.nursePersonalInfo.firstSurname">
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label>Primer apellido</Form.Label>
									<Input
										{...props}
										bind:value={$formData.emergencyCrew.nursePersonalInfo.firstSurname}
									/>
								{/snippet}
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>

						<Form.Field {form} name="emergencyCrew.nursePersonalInfo.secondSurname">
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label>Segundo apellido</Form.Label>
									<Input
										{...props}
										bind:value={$formData.emergencyCrew.nursePersonalInfo.secondSurname}
									/>
								{/snippet}
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>
					</Card.Content>
				</Card.Root>
				<Card.Root>
					<Card.Header>
						<Card.Title class="text-xl font-bold">Información personal conductor</Card.Title>
					</Card.Header>
					<Card.Content>
						<Form.Fieldset
							{form}
							name="emergencyCrew.driverPersonalInfo.idType"
							class="flex flex-col space-y-1"
						>
							<Legend class="font-bold">Tipo de documento</Legend>
							{#await idTypes}
								<p>waiting for the promise to resolve...</p>
							{:then idTypesValues}
								<RadioGroup.Root bind:value={$formData.emergencyCrew.driverPersonalInfo.idType.id}>
									{#each idTypesValues as idTypeValue}
										<Form.Control>
											{#snippet children({ props })}
											<div class="flex items-center space-x-2">
												<RadioGroup.Item
													value={idTypeValue.id}
													{...props}
												/>
												<Form.Label for={idTypeValue.id}>{idTypeValue.name}</Form.Label>
											</div>
											{/snippet}
										</Form.Control>
									{/each}
								</RadioGroup.Root>
							{:catch error}
								<p>Something went wrong: {error.message}</p>
							{/await}
							<Form.FieldErrors />
						</Form.Fieldset>
				
						<Form.Field {form} name="emergencyCrew.driverPersonalInfo.idNumber" class="mt-4">
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label>Número de documento</Form.Label>
									<Input
										{...props}
										bind:value={$formData.emergencyCrew.driverPersonalInfo.idNumber}
									/>
								{/snippet}
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>
				
						<Form.Field {form} name="emergencyCrew.driverPersonalInfo.firstName">
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label>Primer nombre</Form.Label>
									<Input
										{...props}
										bind:value={$formData.emergencyCrew.driverPersonalInfo.firstName}
									/>
								{/snippet}
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>
				
						<Form.Field {form} name="emergencyCrew.driverPersonalInfo.secondName">
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label>Segundo nombre</Form.Label>
									<Input
										{...props}
										bind:value={$formData.emergencyCrew.driverPersonalInfo.secondName}
									/>
								{/snippet}
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>
				
						<Form.Field {form} name="emergencyCrew.driverPersonalInfo.firstSurname">
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label>Primer apellido</Form.Label>
									<Input
										{...props}
										bind:value={$formData.emergencyCrew.driverPersonalInfo.firstSurname}
									/>
								{/snippet}
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>
				
						<Form.Field {form} name="emergencyCrew.driverPersonalInfo.secondSurname">
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label>Segundo apellido</Form.Label>
									<Input
										{...props}
										bind:value={$formData.emergencyCrew.driverPersonalInfo.secondSurname}
									/>
								{/snippet}
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>
					</Card.Content>
				</Card.Root>

				<Card.Root>
					<Card.Header>
						<Card.Title class="text-xl font-bold">Vehículo de emergencia</Card.Title>
					</Card.Header>
					<Card.Content>				
						<Form.Field {form} name="emergencyCrew.ambulanceInfo.plate">
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label>Placa</Form.Label>
									<Input
										{...props}
										bind:value={$formData.emergencyCrew.ambulanceInfo.plate}
									/>
								{/snippet}
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>
					</Card.Content>
				</Card.Root>


			</Accordion.Content>
		</Accordion.Item>
		<Accordion.Item value="section-2">
			<Accordion.Trigger>Información personal paciente</Accordion.Trigger>
			<Accordion.Content>
				Yes. It comes with default styles that matches the other components' aesthetic.
			</Accordion.Content>
		</Accordion.Item>
		<Accordion.Item value="section-3">
			<Accordion.Trigger>Estado de salud paciente</Accordion.Trigger>
			<Accordion.Content>
				Yes. It's animated by default, but you can disable it if you prefer.
			</Accordion.Content>
		</Accordion.Item>
		<Accordion.Item value="section-4">
			<Accordion.Trigger>Detalles servicio prestado</Accordion.Trigger>
			<Accordion.Content>
				Yes. It's animated by default, but you can disable it if you prefer.
			</Accordion.Content>
		</Accordion.Item>
	</Accordion.Root>
	{#if browser}
		<SuperDebug data={$formData} />
	{/if}
	<Form.Button>Submit</Form.Button>
</form>
