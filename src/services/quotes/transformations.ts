/* eslint-disable no-underscore-dangle */
import { Quote } from './types';

export const resToQuote = (res: any): Quote => {
  return {
    id: res._id ?? '',
    content: res.content ?? '',
    author: res.author ?? '',
    tags: res.tags ?? [],
    authorSlug: res.authorSlug ?? '',
    length: res.length ?? 0,
    dateAdded: res.dateAdded ?? null,
    dateModified: res.dateModified ?? null,
  };
};
