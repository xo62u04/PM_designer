import Link from "next/link";
import { notFound } from "next/navigation";
import { loadProject } from "@/lib/data";
import ProjectTabs from "@/components/ProjectTabs";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ owner: string; slug: string }>;
}) {
  const { owner, slug } = await params;
  const project = loadProject(owner, slug);
  if (!project) notFound();

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <Link href="/" className="text-xs text-text-muted hover:text-text-secondary">
        ← 所有專案
      </Link>
      <h1 className="mt-2 text-2xl font-semibold text-text-primary">{project.ref.name}</h1>
      <p className="text-xs text-text-muted">
        {project.ref.owner} / {project.ref.slug}
      </p>

      <div className="mt-8">
        <ProjectTabs project={project} />
      </div>
    </main>
  );
}
