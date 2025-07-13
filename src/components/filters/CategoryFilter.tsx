interface CategoryFilterProps {
  categories: string[];
  selected: string[];
  onChange: (value: string) => void;
}

export default function CategoryFilter({
  categories,
  selected,
  onChange,
}: CategoryFilterProps) {
  return (
    <div>
      <h4 className="font-bold mb-2">Categories</h4>
      <ul className="space-y-1">
        {categories.map((cat: string) => (
          <li key={cat}>
            <label className="flex items-center gap-2 text-[14px]">
              <input
                type="checkbox"
                checked={selected.includes(cat)}
                onChange={() => onChange(cat)}
              />
              {cat}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
