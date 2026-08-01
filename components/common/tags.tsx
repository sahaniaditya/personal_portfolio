import { catOf } from "@/lib/categories";

/** Tech tags. Colour is redundant with the label, never the only cue. */
export function Tags({ items }: { items: readonly string[] }) {
  if (items.length === 0) return null;
  return (
    <div className="ed-tags">
      {items.map((tech) => (
        <span key={tech} className="ed-tag" data-cat={catOf(tech)}>
          {tech}
        </span>
      ))}
    </div>
  );
}
