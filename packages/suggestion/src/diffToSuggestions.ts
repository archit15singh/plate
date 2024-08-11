import type { ValueOf } from '@udecode/plate-common';

import {
  type PlateEditor,
  type TDescendant,
  nanoid,
} from '@udecode/plate-common/server';
import { type ComputeDiffOptions, computeDiff } from '@udecode/plate-diff';

import { getSuggestionProps } from './transforms';

export function diffToSuggestions<E extends PlateEditor>(
  editor: E,
  doc0: TDescendant[],
  doc1: TDescendant[],
  {
    getDeleteProps = () =>
      getSuggestionProps(editor, nanoid(), {
        suggestionDeletion: true,
      }),
    getInsertProps = () => getSuggestionProps(editor, nanoid()),
    getUpdateProps = (_node, _properties, newProperties) =>
      getSuggestionProps(editor, nanoid(), {
        suggestionUpdate: newProperties,
      }),
    isInline = editor.isInline,
    ...options
  }: Partial<ComputeDiffOptions> = {}
): ValueOf<E> {
  return computeDiff(doc0, doc1, {
    getDeleteProps,
    getInsertProps,
    getUpdateProps,
    isInline,
    ...options,
  }) as ValueOf<E>;
}
