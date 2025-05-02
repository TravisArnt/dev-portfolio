<script>
	import { HeroSection, AboutMeSection, MyWorkSection,SkillSection,ContactSection } from '$components';
	let { data } = $props();
	const { workExperience, projects, skills } = data;
</script>

<HeroSection />
<AboutMeSection {workExperience} />
<MyWorkSection {projects} />
<SkillSection {skills}/>
<ContactSection/>