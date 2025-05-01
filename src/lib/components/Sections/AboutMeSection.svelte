<script lang="ts">
	import { SectionHeadline, Button, ExperienceTable } from '$components';
	import mypic from '$assets/IMG_6941.png';
	import { goto } from '$app/navigation';
	import type { SanityDevExperience } from '$components/types/sanity';
	interface AboutMeProps{
		workExperience:SanityDevExperience[];
	}
	let {workExperience}:AboutMeProps = $props();


	function onclick() {
		goto('/#contact-form');
	}
</script>

<section class="about-me mt-l">
	<SectionHeadline sectionName={'about-me'}>About Me</SectionHeadline>
	<div class="mt-m content-container default-margin">
		<img class="image" src={mypic} alt="pic" />
		<div class="text">
			<p>
				Hey, I'm Travis, a passionate developer with a unique background that blends healthcare,
				data, and software engineering.
			</p>
			<p>
				My journey began in medical school, where I developed a deep appreciation for solving
				complex, human-centered problems. After shifting into the tech world, I’ve gained hands-on
				experience in backend development, data analysis , and AI research, particularly in
				healthcare tech. Working across these fields has taught me how to bridge technical systems
				with real-world impact—especially when lives are on the line.
			</p>
			<p>
				Through projects, freelancing, and building in fast-paced environments, I’ve learned how to
				balance clean code with practical problem solving. Whether it's writing scalable backend
				logic in Scala or Python, analyzing health data, or exploring AI use cases for telemedicine
				apps, my mission is to build tools that actually help people.
			</p>
			<p>
				Now, I'm committed to sharing that experience—so you can avoid the overwhelm and move
				forward with clarity. If you’re eager to learn from someone who's navigated career
				transitions, merged domains, and tackled real-world problems, let’s dive in together.
			</p>
			<Button {onclick}>Tell me about your project</Button>
		</div>
	</div>
	<ExperienceTable {workExperience} />
</section>

<style>
	.content-container {
		display: flex;
		justify-content: space-between;
		align-items: stretch;
	}
	.image {
		width: 40%;
		border-radius: 20px;
		object-fit: cover;
	}
	.text {
		width: 55%;
		text-align: left;
	}
</style>
