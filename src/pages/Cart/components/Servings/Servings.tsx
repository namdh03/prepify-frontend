import { memo } from "react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~components/ui/select";

interface SelectProps {
  id: string;
  defaultValue?: string;
}

const servingsList = [
  {
    id: "1",
    name: "1 người ăn",
  },
  {
    id: "3",
    name: "3 người ăn",
  },
  {
    id: "5",
    name: "5 người ăn",
  },
];

const Servings = memo(({ id, defaultValue }: SelectProps) => {
  const handleValueChange = (value: string) => {
    console.log(`CALL API TO UPDATE SERVINGS FOR ITEM ${id} TO ${value}`);
  };

  return (
    <Select defaultValue={defaultValue} onValueChange={(value) => handleValueChange(value)}>
      <SelectTrigger className="w-[150px] ml-auto mr-auto">
        <SelectValue placeholder="Khẩu phần ăn" />
      </SelectTrigger>
      <SelectContent>
        {servingsList.map((item) => (
          <SelectItem key={item.id} value={item.name}>
            {item.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
});

export default Servings;
