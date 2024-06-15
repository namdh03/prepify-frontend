import { useCallback, useMemo, useState } from "react";

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { Button } from "~components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "~components/ui/command";
import { FormControl } from "~components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "~components/ui/popover";
import { cn } from "~lib/utils";

export type ComboboxOption = { value: string; label: string };

type ComboboxProps = {
  options: ComboboxOption[];
  onValueChange: (value: string, label?: string) => void;
  value: string;
  placeholder: string;
  notFoundText: string;
  width?: string;
};

export default function Combobox({
  options = [],
  onValueChange,
  value,
  placeholder,
  notFoundText,
  width = "200px",
}: ComboboxProps) {
  const [open, setOpen] = useState(false);

  const selectedLabel = useMemo(() => options.find((option) => option.value === value)?.label, [options, value]);

  const handleSelect = useCallback(
    (selectedValue: string, selectedLabel: string) => {
      onValueChange(selectedValue, selectedLabel);
      setOpen(false);
    },
    [onValueChange],
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn(`w-[${width}] justify-between`, !value && "text-muted-foreground")}
          >
            {selectedLabel || placeholder}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className={`w-[${width}] p-0`}>
        <Command>
          <CommandInput placeholder={placeholder} className="h-9" />
          <CommandList>
            <CommandEmpty>{notFoundText}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  value={option.label}
                  key={option.value}
                  onSelect={(label) => handleSelect(option.value, label)}
                >
                  {option.label}
                  <CheckIcon className={cn("ml-auto h-4 w-4", option.value === value ? "opacity-100" : "opacity-0")} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
