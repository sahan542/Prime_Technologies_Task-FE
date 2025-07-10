export function createSlug(title: string) {
  return title
    .trim() 
    .toLowerCase() 
    .replace(/\s+/g, "_"); 
}
