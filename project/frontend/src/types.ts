import { listingImageSlot, slotImagePath } from './utils/images';

export type HomeItem = {
  img: string;
  imageSlot: number;
  title: string;
  description: string[];
  bookId: number;
};

export type ChartGroupRow = {
  id: number;
  name: string;
  count: number;
  max_price: number;
  min_price: number;
  avg_price: number;
};

export type GridBookRow = {
  id: number;
  imageSlot: number;
  image: string;
  title: string;
  author: string;
  publisher: string;
  genre: string;
  language: string;
  sale_price: number;
  average_rating: number | null;
  sales_rank: number | null;
  units_sold: number | null;
};

export interface NestedBook {
  id: number;
  csv_index: number;
  title: string;
  publishing_year: number | null;
  average_rating: number | null;
  ratings_count: number | null;
  sale_price: number | null;
  gross_sales: number | null;
  publisher_revenue: number | null;
  sales_rank: number | null;
  units_sold: number | null;
  author: { id: number; name: string; rating: string | null };
  publisher: { id: number; name: string };
  genre: { id: number; name: string };
  language: { id: number; code: string };
}

export function mapBookRow(item: NestedBook): GridBookRow {
  const imageSlot = listingImageSlot(String(item.id));
  return {
    id: item.id,
    imageSlot,
    image: slotImagePath(imageSlot),
    title: item.title,
    author: item.author.name,
    publisher: item.publisher.name,
    genre: item.genre.name,
    language: item.language.code,
    sale_price: item.sale_price ?? 0,
    average_rating: item.average_rating,
    sales_rank: item.sales_rank,
    units_sold: item.units_sold,
  };
}

export function mapHomeItem(item: NestedBook, index: number): HomeItem {
  const imageSlot = index;
  return {
    img: slotImagePath(imageSlot),
    imageSlot,
    title: item.title,
    description: [
      `${item.author.name}. Жанр: ${item.genre.name}.`,
      `Цена: ${item.sale_price ?? '—'}. Рейтинг: ${item.average_rating ?? '—'}. Издательство: ${item.publisher.name}.`,
    ],
    bookId: item.id,
  };
}

export function mapChartStat(row: ChartGroupRow) {
  return {
    id: row.id,
    name: row.name,
    count: row.count,
    max_price: row.max_price,
    min_price: row.min_price,
    avg_price: row.avg_price,
  };
}

export type ChartGroup = ReturnType<typeof mapChartStat>[];
