// src/lib/highlighter.ts
import { createHighlighter, createCssVariablesTheme, type Highlighter } from 'shiki';

let highlighterPromise: Promise<Highlighter> | null = null;

const cssVariablesTheme = createCssVariablesTheme({
	name: 'css-variables',
	variablePrefix: '--astro-code-',
	variableDefaults: {},
	fontStyle: true,
});

const LANGS = [
	'astro', 'bash', 'c', 'cpp', 'csharp', 'css', 'glsl',
	'html', 'java', 'javascript', 'json', 'markdown',
	'python', 'shell', 'typescript', 'yaml',
];

export function getSharedHighlighter() {
	if (!highlighterPromise) {
		highlighterPromise = createHighlighter({
			themes: [cssVariablesTheme], // pass the generated object, not the string
			langs: LANGS,
		});
	}
	return highlighterPromise;
}