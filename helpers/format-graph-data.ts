export function countOccurrences(data, labels) {
  if (!data) return [];

  const uniqueLabels = new Set(labels);

  return Array.from(uniqueLabels).map((label) => {
    const count = data.filter(
      (data) => data.category.category === label
    ).length;
    return count;
  });
}
