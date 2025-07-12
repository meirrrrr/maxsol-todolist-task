import { SegmentedControl, Box } from "@mantine/core";

interface FilterPanelProps {
  filter: "all" | "completed" | "active";
  setFilter: (value: "all" | "completed" | "active") => void;
}

export function FilterPanel({ filter, setFilter }: FilterPanelProps) {
  return (
    <Box mb="md">
      <SegmentedControl
        value={filter}
        onChange={(value) => setFilter(value as "all" | "completed" | "active")}
        data={[
          { label: "Все", value: "all" },
          { label: "Выполненные", value: "completed" },
          { label: "Активные", value: "active" },
        ]}
      />
    </Box>
  );
}
