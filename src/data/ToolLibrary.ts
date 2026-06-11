import type { SoftwareTool } from '../objects/SoftwareTool';


const PAGES_ROOTPATH = '../pages/tools';
const ICON_ROOTPATH = '/software';

const rawTools = [
  {
    id: "Houdini",
    label: "Houdini",
    enabled: true,
  },
  {
    id: "Maya",
    label: "Maya",
    enabled: true,
  },
  {
    id: "Nuke",
    label: "Nuke",
    enabled: true,
  },
  {
    id: "UnrealEngine",
    label: "Unreal Engine",
    enabled: true,
  },
  {
    id: "Notion",
    label: "Notion",
    enabled: true,
  },
  {
    id: "SubstancePainter",
    label: "Substance Painter",
    enabled: true,
  },
  {
    id: "Photoshop",
    label: "Adobe Photoshop",
    enabled: true,
  },
  {
    id: "Windows",
    label: "Windows",
    enabled: true,
  },
  {
    id: "Blender",
    label: "Blender",
    enabled: false,
  },
];



export const toolLibrary: SoftwareTool[] = rawTools.map(tool => ({
  ...tool,
  iconPath: `${ICON_ROOTPATH}/AS_${tool.id}.svg`,
  pagesPath: `${PAGES_ROOTPATH}/${tool.id}`,
}));


export function getActiveTools(): SoftwareTool[] {
  return toolLibrary.filter(tool => tool.enabled);
}