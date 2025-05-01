import type { ProcessedImageContent, ProcessedProject, ProcessedTextContent, RawImageContent, RawTextContent, SanityProject } from '$components/types/sanity'
import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'


export const sanityClient = createClient({
    projectId: 'wvvfe54v',
    dataset: 'production',
    useCdn: true, // set to `false` to bypass the edge cache
    apiVersion: '2025-02-06', // use current date (YYYY-MM-DD) to target the latest API version. Note: this should always be hard coded. Setting API version based on a dynamic value (e.g. new Date()) may break your application at a random point in the future.
    // token: process.env.SANITY_SECRET_TOKEN // Needed for certain operations like updating content, accessing drafts or using draft perspectives
  })


export function processProjectEntries(rawProject:SanityProject){
  const builder = imageUrlBuilder(sanityClient);
  const projectImageUrl = builder.image(rawProject.image).url();

  const processedProject:ProcessedProject={
      name:rawProject.name,
      company:rawProject.company,
      dateAccomplished:rawProject.dateAccomplished,
      stack:rawProject.stack,
      projectImageUrl,
      slug:rawProject.slug,
      content:rawProject.content.map(processProjectContent)
      // content: (ProcessedTextContent | ProcessedImageContent)[];   
  }
  return processedProject;
}


function processProjectContent(content:RawTextContent | RawImageContent) {
  if(content._type == "block") {
    const ProcessedTextContent: ProcessedTextContent = {
      type:"text",
      style: content.style,
      textToRender:content.children.map((elem) => elem.text).join("\n")
    };
    return ProcessedTextContent;
  } else {
    const builder = imageUrlBuilder(sanityClient);
    const projectImageUrl = builder.image(content).url();
    
    const processedImage:ProcessedImageContent = {
      type:"image",
      url:projectImageUrl,
    };
    return processedImage
  }

}