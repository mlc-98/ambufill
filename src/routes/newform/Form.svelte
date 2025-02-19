<script lang="ts">
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { formSchema, type FormSchema } from './schema';
	import { type SuperValidated, type Infer, superForm, superValidate } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	type idType = {
		id: string;
		name: string;
		abbreviation: string;
	};

	let {
		data
	}: {
		data: {
			form: SuperValidated<Infer<FormSchema>>;
			idTypes: Promise<idType[]>;
		};
	} = $props();

	const form = superForm(data.form, {
		validators: zodClient(formSchema),
		dataType: 'json'
	});

	const { form: formData, enhance } = form;

	const idTypes = data.idTypes;
	console.log(idTypes);
</script>

<form method="POST" use:enhance>
	<Accordion.Root type="single" class="w-full sm:max-w-[70%]">
		<Accordion.Item value="section-1">
			<Accordion.Trigger>Información equipo de emergencia</Accordion.Trigger>
			<Accordion.Content>
				<Form.Fieldset {form} name="emergencyCrew.nursePersonalInfo.idType">
					<Form.Legend>Tipo de identificación</Form.Legend>

					{#await idTypes}
						<p>waiting for the promise to resolve...</p>
					{:then idTypesValue}
						{#each idTypesValue as idType}
							<Form.Control>
								{#snippet children({ props })}
									<input
										{...props}
										type="radio"
										bind:group={$formData.emergencyCrew.nursePersonalInfo.idType.abbreviation}
										value={idType.abbreviation}
									/>
									<Form.Label>{idType.name}</Form.Label>
								{/snippet}
							</Form.Control>
						{/each}
					{:catch error}
						<p>Something went wrong: {error.message}</p>
					{/await}

					<Form.FieldErrors />
				</Form.Fieldset>

				<Form.Field {form} name="emergencyCrew.nursePersonalInfo.idNumber">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Tipo de identificación</Form.Label>
							<Input {...props} bind:value={$formData.emergencyCrew.nursePersonalInfo.idType} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
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

	<Form.Button>Submit</Form.Button>
</form>
