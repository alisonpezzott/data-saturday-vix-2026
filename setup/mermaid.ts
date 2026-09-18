import { defineMermaidSetup } from '@slidev/types'

/**
 * Mermaid in the deck's palette. `base` is the only built-in theme that
 * honours themeVariables in full. Node borders use #71717a (3.4:1 on the node
 * fill, over the 3:1 graphic floor); the accent is applied per diagram with
 * `classDef acc stroke:#2dd4bf` on the one node the diagram is about.
 */
const BG = '#0b0b0d'
const SURFACE = '#131316'
const NODE = '#1b1b1f'
const BORDER = '#71717a'
const FG = '#f4f4f5'
const FG2 = '#a1a1aa'
const FONT = "'Geist Variable', 'Inter', 'Segoe UI', system-ui, sans-serif"

export default defineMermaidSetup(() => ({
  theme: 'base',
  fontFamily: FONT,
  flowchart: {
    curve: 'linear',
    useMaxWidth: true,
    htmlLabels: true,
    padding: 10,
    nodeSpacing: 36,
    rankSpacing: 46,
  },
  themeVariables: {
    background: BG,
    fontFamily: FONT,
    fontSize: '15px',

    primaryColor: NODE,
    primaryTextColor: FG,
    primaryBorderColor: BORDER,
    mainBkg: NODE,
    nodeBorder: BORDER,
    nodeTextColor: FG,

    secondaryColor: SURFACE,
    secondaryTextColor: FG,
    secondaryBorderColor: BORDER,
    tertiaryColor: SURFACE,
    tertiaryTextColor: FG,
    tertiaryBorderColor: BORDER,

    lineColor: FG2,
    textColor: FG,
    titleColor: FG,
    edgeLabelBackground: BG,
    labelBackground: BG,
    labelTextColor: FG,

    clusterBkg: SURFACE,
    clusterBorder: BORDER,
  },
}))
