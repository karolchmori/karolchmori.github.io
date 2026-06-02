import type { MDXComponents } from 'mdx/types'
import ProjectCard from './app/components/ProjectCard' // Adjust path if needed

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    // This tells MDX: "When you see <ProjectCard /> in an .mdx file, use this component"
    ProjectCard: ProjectCard, 
  }
}