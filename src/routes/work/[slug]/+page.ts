import type { SanityProject } from '$components/types/sanity';
import { processProjectEntries, sanityClient } from '$components/utils/sanity';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const { slug } = params;

	const rawProjects: SanityProject[] = await sanityClient.fetch(
		`*[_type == "project" && slug == $slug]`,
		{ slug }
	);

	if (rawProjects.length !== 1) {
		throw error(404, 'Project not found');
	}
	const project = processProjectEntries(rawProjects[0]);
    console.log('Slug:', slug);
    console.log('Raw project:', rawProjects);
	return {
		project
	};
    

};
