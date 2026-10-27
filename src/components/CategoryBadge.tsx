interface CategoryBadgeProps {
  name: string;
}

function CategoryBadge({ name }: CategoryBadgeProps) {
  return (
    <span className="inline-block rounded-full bg-[#fbe9e3] px-3 py-1 text-xs font-semibold text-[#c73a0f]">
      {name}
    </span>
  );
}

export default CategoryBadge;
