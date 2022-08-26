import { useMemo, useState } from "react";

const useSelect = (defaultValue) => {
  const [select, setSelect] = useState(defaultValue);
  const isSelected = useMemo(() => select.length > 0, [select]);

  const onSelectChange = (value) => {
    const index = select.indexOf(value);
    if (index > -1) {
      setSelect([...select.slice(0, index), ...select.slice(index + 1)]);
    } else {
      setSelect([...select, value]);
    }
  };

  return {
    select,
    setSelect,
    isSelected,
    onSelectChange,
  };
};

export default useSelect;
