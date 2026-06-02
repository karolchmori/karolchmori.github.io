export default function ProjectCard({ title, description }: { title: string, description: string }) {
  return (
    <div className="p-6 border border-zinc-200 rounded-xl bg-white shadow-sm">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-zinc-600 mt-2">{description}</p>
    </div>
  );
}