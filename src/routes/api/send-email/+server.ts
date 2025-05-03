import { SENDGRID_API_KEY } from '$env/static/private';
import sgMail from '@sendgrid/mail';
import { json } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';

sgMail.setApiKey(SENDGRID_API_KEY);

export async function POST({ request }: RequestEvent) {
	const { contactName, contactEmail, projectInformation } = await request.json();

	if (!contactEmail || !contactName || !projectInformation) {
		return json({ message: "Could not send email. Missing data" }, { status: 400 });
	}

	const message = {
		to: 'tinthtoo008@gmail.com',
		from: 'tinthtoo008@gmail.com',
		subject: 'Contact Form on your portfolio',
		html: `
			<p>Somebody used the contact form on your site.</p>
			<p><strong>Name:</strong> ${contactName}</p>
			<p><strong>Email:</strong> ${contactEmail}</p>
			<p><strong>Project Info:</strong> ${projectInformation}</p>
		`
	};

	try {
		await sgMail.send(message);
		return json({ emailSentSuccessfully: true });
	} catch (err) {
		console.error("SendGrid error:", err);
		return json({ error: "Failed to send email." }, { status: 500 });
	}
}
