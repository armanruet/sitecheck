'use client';

interface Tag {
  name: string;
  count: number;
}

interface TagsListProps {
  tags: Tag[];
  selectedTag?: string;
  onTagSelect?: (tag: string | null) => void;
}

export default function TagsList({ tags, selectedTag, onTagSelect }: TagsListProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {tags.map(({ name, count }) => (
        <button
          key={name}
          onClick={() => onTagSelect?.(name === selectedTag ? null : name)}
          className={`px-3 py-1 text-sm rounded-full transition-colors
            ${
              name === selectedTag
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
        >
          {name} ({count})
        </button>
      ))}
    </div>
  );
}
