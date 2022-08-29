import { useMemo, useState } from "react";

const useItems = (defaultValue) => {
  const [items, setItems] = useState(defaultValue);
  // const [select, setSelect] = useState([]);

  const selectedCount = useMemo(
    () => items.filter((item) => item.selected).length,
    [items]
  );

  const addItem = (item) => {
    const lastItem = items[items.length - 1];
    const isLastValid = lastItem.description;
    const isFirstTime = items.length === 0;

    // Only add new item if previous item is valid or first time input
    if (isLastValid || isFirstTime) {
      setItems([...items, item]);
    }
  };

  const updateItem = (index, item) => {
    setItems([...items.slice(0, index), item, ...items.slice(index + 1)]);
  };

  const removeItem = () => {
    const filteredItems = items.filter((item) => !item.selected);

    setItems(filteredItems);
  };

  return { addItem, updateItem, removeItem, items, selectedCount };
};

export default useItems;
