export function ChapterLabel({ 
  tag, 
  colorClass = "text-text-muted" 
}: { 
  tag: string; 
  colorClass?: string;
}) {
  return (
    <div className={`font-mono text-[11px] tracking-[3px] uppercase ${colorClass} mb-6`}>
      {tag}
    </div>
  );
}
