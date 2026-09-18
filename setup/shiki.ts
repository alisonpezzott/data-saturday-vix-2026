import { defineShikiSetup } from '@slidev/types'

/**
 * One Shiki theme for the whole deck, in the deck's own palette: greys for
 * everything, white for the names you look up, teal only for keywords and
 * decorators — the two things a code slide here is ever *about*.
 *
 * Contrast is measured against the highlighted line (#1a2624 = teal 10% over
 * #131316), the darkest ground a token ever sits on. Nothing below 4.5:1.
 */
const mono = {
  name: 'mono-teal',
  type: 'dark' as const,
  colors: {
    'editor.background': '#131316',
    'editor.foreground': '#f4f4f5',
  },
  tokenColors: [
    { settings: { foreground: '#f4f4f5', background: '#131316' } },
    {
      scope: ['comment', 'punctuation.definition.comment', 'string.comment'],
      settings: { foreground: '#8a8a93', fontStyle: 'italic' }, // 5.3:1
    },
    {
      scope: [
        'keyword',
        'storage.type',
        'storage.modifier',
        'keyword.control',
        'keyword.operator.new',
        'keyword.operator.expression',
        'constant.language',
      ],
      settings: { foreground: '#2dd4bf' }, // 9.9:1
    },
    {
      // TC39 decorators: the visual signature of a Rayfin entity.
      scope: [
        'meta.decorator',
        'punctuation.decorator',
        'meta.decorator entity.name.function',
        'meta.decorator variable.other.readwrite',
        'meta.decorator punctuation.definition.decorator',
      ],
      settings: { foreground: '#2dd4bf' },
    },
    {
      scope: ['string', 'string.quoted', 'punctuation.definition.string', 'string.template'],
      settings: { foreground: '#d4d4d8' }, // 12.5:1
    },
    {
      scope: ['constant.numeric', 'constant.character', 'constant.other'],
      settings: { foreground: '#e4e4e7' },
    },
    {
      scope: [
        'entity.name.function',
        'support.function',
        'entity.name.type',
        'entity.name.class',
        'support.type',
        'support.class',
        'entity.name.tag',
        'entity.other.attribute-name',
        'entity.name.section',
      ],
      settings: { foreground: '#ffffff' },
    },
    {
      scope: [
        'variable',
        'variable.other',
        'variable.parameter',
        'meta.object-literal.key',
        'support.type.property-name',
      ],
      settings: { foreground: '#f4f4f5' },
    },
    {
      scope: [
        'punctuation',
        'meta.brace',
        'keyword.operator',
        'punctuation.separator',
        'punctuation.terminator',
      ],
      settings: { foreground: '#a1a1aa' }, // 6.0:1
    },
    {
      // YAML keys read as structure, values as content.
      scope: ['source.yaml entity.name.tag', 'source.yaml punctuation.separator.key-value'],
      settings: { foreground: '#a1a1aa' },
    },
    {
      scope: ['source.yaml string', 'source.yaml constant', 'string.unquoted.plain.out.yaml'],
      settings: { foreground: '#f4f4f5' },
    },
  ],
}

export default defineShikiSetup(() => ({
  themes: {
    dark: mono,
    light: mono,
  },
}))
