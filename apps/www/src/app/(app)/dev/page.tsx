import { withProps } from '@udecode/cn';
import {
  BaseBoldPlugin,
  BaseCodePlugin,
  BaseItalicPlugin,
  BaseStrikethroughPlugin,
  BaseSubscriptPlugin,
  BaseSuperscriptPlugin,
  BaseUnderlinePlugin,
} from '@udecode/plate-basic-marks';
import { BaseBlockquotePlugin } from '@udecode/plate-block-quote';
import {
  BaseCodeBlockPlugin,
  BaseCodeLinePlugin,
  BaseCodeSyntaxPlugin,
} from '@udecode/plate-code-block';
import {
  BaseParagraphPlugin,
  PlateStatic,
  createSlateEditor,
} from '@udecode/plate-common';
import { BaseHeadingPlugin, HEADING_KEYS } from '@udecode/plate-heading';
import { serializeHtml } from '@udecode/plate-html';

import { basicNodesValue } from '@/registry/default/example/values/basic-nodes-value';
import { BlockquoteStaticElement } from '@/registry/default/plate-static-ui/blockquote-element';
import { CodeBlockElementStatic } from '@/registry/default/plate-static-ui/code-block-element';
import { CodeStaticLeaf } from '@/registry/default/plate-static-ui/code-leaf';
import { CodeLineStaticElement } from '@/registry/default/plate-static-ui/code-line-element';
import { CodeSyntaxStaticLeaf } from '@/registry/default/plate-static-ui/code-syntax-leaf';
import { HeadingStaticElement } from '@/registry/default/plate-static-ui/heading-element';
import {
  ParagraphStaticElement,
  PlateStaticLeaf,
} from '@/registry/default/plate-static-ui/paragraph-element';

export default async function DevPage() {
  const editorStatic = createSlateEditor({
    plugins: [
      BaseParagraphPlugin,
      BaseHeadingPlugin,
      BaseBoldPlugin,
      BaseCodePlugin,
      BaseItalicPlugin,
      BaseStrikethroughPlugin,
      BaseSubscriptPlugin,
      BaseSuperscriptPlugin,
      BaseUnderlinePlugin,
      BaseBlockquotePlugin,
      BaseCodeBlockPlugin,
    ],
    staticComponents: {
      [BaseBlockquotePlugin.key]: BlockquoteStaticElement,
      [BaseBoldPlugin.key]: withProps(PlateStaticLeaf, { as: 'strong' }),
      [BaseCodeBlockPlugin.key]: CodeBlockElementStatic,
      [BaseCodeLinePlugin.key]: CodeLineStaticElement,
      [BaseCodePlugin.key]: CodeStaticLeaf,
      [BaseCodeSyntaxPlugin.key]: CodeSyntaxStaticLeaf,
      [BaseItalicPlugin.key]: withProps(PlateStaticLeaf, { as: 'em' }),
      [BaseParagraphPlugin.key]: ParagraphStaticElement,
      [BaseStrikethroughPlugin.key]: withProps(PlateStaticLeaf, { as: 'del' }),
      [BaseSubscriptPlugin.key]: withProps(PlateStaticLeaf, { as: 'sub' }),
      [BaseSuperscriptPlugin.key]: withProps(PlateStaticLeaf, { as: 'sup' }),
      [BaseUnderlinePlugin.key]: withProps(PlateStaticLeaf, { as: 'u' }),
      [HEADING_KEYS.h1]: withProps(HeadingStaticElement, { variant: 'h1' }),
      [HEADING_KEYS.h2]: withProps(HeadingStaticElement, { variant: 'h2' }),
      [HEADING_KEYS.h3]: withProps(HeadingStaticElement, { variant: 'h3' }),
      [HEADING_KEYS.h4]: withProps(HeadingStaticElement, { variant: 'h4' }),
      [HEADING_KEYS.h5]: withProps(HeadingStaticElement, { variant: 'h5' }),
      [HEADING_KEYS.h6]: withProps(HeadingStaticElement, { variant: 'h6' }),
    },
    value: [...basicNodesValue],
  });

  // eslint-disable-next-line @typescript-eslint/await-thenable
  const html = await serializeHtml(editorStatic, {
    nodes: editorStatic.children,
  });

  return (
    <div className="mx-auto w-1/2">
      <h1>Plate Static :</h1>
      <PlateStatic editor={editorStatic} />

      <br />
      <br />
      <h1>HTML :</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
