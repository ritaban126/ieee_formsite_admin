import { useState } from 'react';

export function useReorder<T extends { id: string; order?: number }>(
  initial: T[]
) {
  const [items, setItems] = useState<T[]>(initial);

  const move = (id: string, dir: 'up' | 'down') => {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.id === id);
      if (idx < 0) return prev;
      const swap = dir === 'up' ? idx - 1 : idx + 1;
      if (swap < 0 || swap >= prev.length) return prev;
      const copy = [...prev];
      const [item] = copy.splice(idx, 1);
      copy.splice(swap, 0, item);
      return copy.map((it, i) => ({ ...it, order: i + 1 }));
    });
  };

  const update = (id: string, patch: Partial<T>) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...patch } : i)));

  const add = (item: T) => {
    setItems((prev) => {
      const next = { ...item, order: prev.length + 1 } as T;
      return [...prev, next];
    });
  };

  const remove = (id: string) =>
    setItems((prev) =>
      prev.filter((i) => i.id !== id).map((it, i) => ({ ...it, order: i + 1 }))
    );

  const set = (next: T[]) => setItems(next);

  return { items, move, update, add, remove, set };
}
