import type { ChartGroupRow, NestedBook } from '../types';

const FEATURED_LIMIT = 14;

let featuredCache: NestedBook[] | null = null;
let featuredPromise: Promise<NestedBook[]> | null = null;

let chartsCache: {
  publisher: ChartGroupRow[];
  genre: ChartGroupRow[];
  language: ChartGroupRow[];
} | null = null;
let chartsPromise: Promise<{
  publisher: ChartGroupRow[];
  genre: ChartGroupRow[];
  language: ChartGroupRow[];
}> | null = null;

let quizCache: QuizApiItem[] | null = null;
let quizPromise: Promise<QuizApiItem[]> | null = null;

let metaCache: MetaResponse | null = null;
let metaPromise: Promise<MetaResponse> | null = null;

export interface QuizApiItem {
  id: number;
  type: string;
  title: string;
  tasks: string;
}

export interface MetaResponse {
  genres: { id: number; name: string }[];
  publishers: { id: number; name: string }[];
  languages: { id: number; code: string }[];
  authors: { id: number; name: string }[];
}

export interface BooksQuery {
  limit: number;
  offset: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
  publisher_id?: number;
  genre_id?: number;
  language_id?: number;
  search?: string;
  min_rating?: number;
}

export interface BooksPage {
  total: number;
  books: NestedBook[];
}

async function apiGet<T>(path: string, auth = false): Promise<T> {
  const { apiJson } = await import('./config');
  return apiJson<T>(path, {}, auth);
}

function buildQuery(params: BooksQuery): string {
  const search = new URLSearchParams();
  search.set('limit', String(params.limit));
  search.set('offset', String(params.offset));
  if (params.sort_by) search.set('sort_by', params.sort_by);
  if (params.sort_order) search.set('sort_order', params.sort_order);
  if (params.publisher_id != null) search.set('publisher_id', String(params.publisher_id));
  if (params.genre_id != null) search.set('genre_id', String(params.genre_id));
  if (params.language_id != null) search.set('language_id', String(params.language_id));
  if (params.search) search.set('search', params.search);
  if (params.min_rating != null) search.set('min_rating', String(params.min_rating));
  return search.toString();
}

export function fetchBooks(params: BooksQuery): Promise<BooksPage> {
  return apiGet<{ total: number; books: NestedBook[] }>(
    `/v1/aggregate/all/?${buildQuery(params)}`,
  ).then((data) => ({ total: data.total, books: data.books }));
}

export function getFeaturedBooks(): Promise<NestedBook[]> {
  if (featuredCache) return Promise.resolve(featuredCache);
  if (!featuredPromise) {
    featuredPromise = fetchBooks({
      limit: FEATURED_LIMIT,
      offset: 0,
      sort_by: 'sales_rank',
      sort_order: 'asc',
      min_rating: 3.5,
    })
      .then((data) => {
        featuredCache = data.books;
        return featuredCache;
      })
      .catch((err) => {
        featuredPromise = null;
        throw err;
      });
  }
  return featuredPromise;
}

export function getBookById(id: number): Promise<NestedBook> {
  return apiGet<{ success: boolean; book: NestedBook }>(`/v1/books/${id}`).then((data) => data.book);
}

export function getChartsData(): Promise<{
  publisher: ChartGroupRow[];
  genre: ChartGroupRow[];
  language: ChartGroupRow[];
}> {
  if (chartsCache) return Promise.resolve(chartsCache);
  if (!chartsPromise) {
    chartsPromise = apiGet<{
      publisher: ChartGroupRow[];
      genre: ChartGroupRow[];
      language: ChartGroupRow[];
    }>('/v1/aggregate/charts/')
      .then((data) => {
        chartsCache = { publisher: data.publisher, genre: data.genre, language: data.language };
        return chartsCache;
      })
      .catch((err) => {
        chartsPromise = null;
        throw err;
      });
  }
  return chartsPromise;
}

export function getQuizData(): Promise<QuizApiItem[]> {
  if (quizCache) return Promise.resolve(quizCache);
  if (!quizPromise) {
    quizPromise = apiGet<QuizApiItem[]>('/v1/aggregate/quiz/')
      .then((data) => {
        quizCache = data;
        return quizCache;
      })
      .catch((err) => {
        quizPromise = null;
        throw err;
      });
  }
  return quizPromise;
}

export function getMeta(): Promise<MetaResponse> {
  if (metaCache) return Promise.resolve(metaCache);
  if (!metaPromise) {
    metaPromise = apiGet<MetaResponse>('/v1/meta/')
      .then((data) => {
        metaCache = data;
        return metaCache;
      })
      .catch((err) => {
        metaPromise = null;
        throw err;
      });
  }
  return metaPromise;
}

export function invalidateBooksCache() {
  featuredCache = null;
  featuredPromise = null;
}
