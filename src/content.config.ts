import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
		}),
});

const tool = defineCollection({
	loader: glob({ base: './src/content/tools', pattern: '**/*.{md,mdx}' }),
	schema: ({image}) => 
		z.object({
			title: z.string(),
			description: z.string(),
			software: z.string(),
			thumbnail: z.optional(image()).nullable().default(null),
			pubDate: z.coerce.date(),
			featured: z.boolean().default(false),
			stack: z.array(z.string()).default([]), 
			department: z.array(z.string()).default([]),
		})
});

export const collections = { blog, tool };
