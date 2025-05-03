<script lang="ts">
	import { SectionHeadline, Button } from '$components';
	let contactName = $state('');
	let contactEmail = $state('');
	let projectInformation = $state('');
	let isFormInvalid = $state(false);
	let isEmailSent = $state(false);
    let isLoading = $state(false);

	async function onsubmit(event: MouseEvent) {
		event.preventDefault(); // <-- Add parentheses

		try {
			if (contactName && contactEmail && projectInformation) {
                isLoading = true
				const response = await fetch('/api/send-email', {
					method: 'POST',
					body: JSON.stringify({ contactName, contactEmail, projectInformation }),
					headers: { 'content-type': 'application/json' }
				});
				isEmailSent = true;
				console.log(response);
                isLoading = false
			} else {
				isFormInvalid = true;
			}
		} catch (error) {
			console.log(error);
		}
	}

	$effect(() => {
		if (contactEmail || contactName || projectInformation) {
			isFormInvalid = false;
		}
	});
</script>

<section class="mt-l">
	<SectionHeadline sectionName="contact-form">Let's Talk</SectionHeadline>

	<div class="form-container default-margin mt-m">
		{#if isEmailSent}
			<div class="spinner-container">
				<h3>Thank you for sending message to me!! <br />I'll reply back in 48 hrs.</h3>
			</div>
        {:else if isLoading}
        <div class="spinner-container">
            <div class="spinner"></div>
            <h3>Sending off the contact form</h3>

        </div>

		{:else}
			<form action="">
				<input
					class="text-input mb-m"
					class:input-error={isFormInvalid && contactName.length === 0}
					placeholder="Your Name"
					type="text"
					bind:value={contactName}
				/>
				<input
					class="text-input mb-m"
					class:input-error={isFormInvalid && contactEmail.length === 0}
					placeholder="Your Email"
					type="text"
					bind:value={contactEmail}
				/>
				<textarea
					class:input-error={isFormInvalid && projectInformation.length === 0}
					placeholder="Tell me what's up"
					bind:value={projectInformation}
				></textarea>
				<Button onclick={onsubmit}>Submit</Button>
			</form>
		{/if}

		<div class="form-text">
			<h3 class="bold mb-s">Talk to me about your project</h3>
			<p>
				I'm always excited to hear about new and innovative ideas! Whether you're in the early
				stages of planning or have a well-defined project, I'm here to help bring your vision to
				life. Feel free to drop me a message with some details about your project, and let's start a
				conversation about how we can work together. I look forward to connecting with you and
				discussing the possibilities. Talk to you soon!
			</p>
		</div>
	</div>
</section>

<style>
	section {
		padding-bottom: 140px;
	}
	.form-container {
		display: flex;
		justify-content: space-between;
	}
	.form-text {
		width: 39%;
	}
	form {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		width: 45%;
	}
	form * {
		font-size: 20px;
		font-family: 'Inter Tight', sans-serif;
		font-weight: 500;
		color: black;
	}
	textarea,
	input {
		width: 100%;
		background-color: rgba(0, 0, 0, 0.035);
		border-radius: 8px;
		padding: 4px 12px;
		outline: none;
		border: none;
	}
	textarea {
		height: 120px;
		margin-bottom: 40px;
	}
	textarea::placeholder,
	input::placeholder {
		font-size: 16px;
		font-weight: 400;
	}

	.input-error {
		background-color: rgba(223, 87, 87, 0.667);
	}
	.input-error::placeholder {
		color: white;
	}

	.spinner {
		border: 4px solid rgba(0, 0, 0, 0.1);
		border-left-color: black;
		border-radius: 50%;
		width: 16px;
		height: 16px;
		display: inline-block;
		margin-right: 8px;
		animation: spin 1s linear infinite;
	}
	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
	.spinner-container {
		display: flex;
	}
</style>
