/**
 * components/mdx-components.ts
 * Central re-export so MDX files only need ONE import line:
 *
 *   import { CompareImage, ConfigTable, Callout, IconList, CodeBlock, StackBadge } from '../../../../components/mdx-components';
 *
 * instead of one `import X from '...'` per component.
 *
 * If you also want these to apply AUTOMATICALLY without writing tags by
 * hand at all (e.g. every ```code``` fence becomes <CodeBlock>, every
 * blockquote becomes <Callout>), export this same object as the default
 * export and pass it as `components` when rendering, or wire it into
 * `mdxComponents` per Astro's MDX docs. See the bottom of this file.
 */

export { default as CompareImage } from './widgets/CompareImage.astro';
export { default as DynamicTable } from './widgets/DynamicTable.astro';
export { default as Callout } from './widgets/Callout.astro';
export { default as IconList } from './widgets/IconList.astro';
export { default as CodeBlock } from './widgets/CodeBlock.astro';
export { default as Collapsible } from './widgets/Collapsible.astro';

// Existing components from your project, re-exported the same way:
export { default as VideoEmbed } from './widgets/VideoEmbed.astro';
export { default as HorizontalCarousel } from './widgets/HorizontalCarousel.astro';


/**
 * OPTIONAL: auto-mapping standard Markdown elements to these components
 * site-wide, so you never write <Callout> or <CodeBlock> tags at all.
 *
 * In your MDX-rendering layout/page:
 *
 *   import * as components from '../components/mdx-components';
 *   ...
 *   <Content components={components} />
 *
 * Astro maps exported names that match HTML element names (e.g. `pre`,
 * `blockquote`, `table`) onto these components automatically when you
 * pass them this way. If you want plain ```fences``` to render through
 * CodeBlock automatically, export it again under the key `pre` here:
 *
 *   export { default as pre } from './widgets/CodeBlock.astro';
 *
 * Keep in mind CodeBlock's prop shape (`lang`, `code`) differs slightly
 * from what Astro passes a raw `pre` override, so you'd adjust props
 * inside CodeBlock.astro to read `Astro.props.class` (Shiki encodes the
 * language there as `language-xxx`) if you go this route.
 */