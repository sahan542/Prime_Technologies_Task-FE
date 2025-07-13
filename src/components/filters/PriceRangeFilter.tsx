import { Slider } from 'antd';

interface PriceRangeFilterProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

export default function PriceRangeFilter({
  min,
  max,
  value,
  onChange,
}: PriceRangeFilterProps) {
  return (
    <div>
      <h4 className="font-bold mb-2">Price Range</h4>
      <Slider
        range
        min={min}
        max={max}
        step={100}
        value={value}
        onChange={onChange}
      />
      <div className="flex justify-between text-sm mt-1">
        <span>Rs. {value[0]}</span>
        <span>Rs. {value[1]}</span>
      </div>
    </div>
  );
}
