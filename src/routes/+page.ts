import type { SanityDevExperience, SanityProject, Skill } from '$components/types/sanity';
import { processProjectEntries, sanityClient } from '$components/utils/sanity';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const workExperience: SanityDevExperience[] = await sanityClient.fetch(
		'*[_type == "devExperience"] | order(startDate desc)'
	);

	const rawProjects: SanityProject[] = await sanityClient.fetch(
		'*[_type == "project"] | order(dateAccomplished desc)'
	);

	const skills: Skill[] = await sanityClient.fetch(`*[_type == "skills"][0].skillsList`);


	const projects = rawProjects.map(processProjectEntries);
	console.log(projects[0]);

	return {
		workExperience,
		projects,
		skills
	};
};
