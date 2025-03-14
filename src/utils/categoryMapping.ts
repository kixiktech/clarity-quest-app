export type CategoryType = 'career' | 'finances' | 'personal-growth' | 'confidence' | 'health' | 'relationships' | 'focus';

export const categories = [
  { id: 1, title: "career + purpose", key: "career" },
  { id: 2, title: "money + finances", key: "finances" },
  { id: 3, title: "growth + mindset", key: "personal-growth" },
  { id: 4, title: "confidence + self-worth", key: "confidence" },
  { id: 5, title: "health + wellness", key: "health" },
  { id: 6, title: "friends + family + relationships", key: "relationships" },
] as const;

export function mapDisplayToDbCategory(displayCategory: string): CategoryType {
  const baseCategory = displayCategory.split(' + ')[0].toLowerCase();
  
  const category = categories.find(c => c.title.startsWith(baseCategory));
  return category?.key || baseCategory as CategoryType;
}

export function getDisplayCategory(dbCategory: CategoryType): string {
  const category = categories.find(c => c.key === dbCategory);
  return category?.title || dbCategory;
} 