interface BrandFilterProps {
  brands: string[];
  selected: string[];
  onChange: (value: string) => void;
}

export default function BrandFilter({
  brands,
  selected,
  onChange,
}: BrandFilterProps) {
  return (
    <div>
      <h4 className="font-bold mb-2">Brands</h4>
      <ul className="space-y-1">
        {brands.map((brand: string) => (
          <li key={brand}>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selected.includes(brand)}
                onChange={() => onChange(brand)}
              />
              {brand}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
