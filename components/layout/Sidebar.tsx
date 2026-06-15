export default function Sidebar() {
  return (
    <aside className="w-64 bg-zinc-900 h-screen border-r border-zinc-800">
      <div className="p-6">
        <h1 className="text-xl font-bold text-white">
          SmartToolStack
        </h1>
      </div>

      <nav className="px-4 space-y-3">
        <div className="text-zinc-300">Dashboard</div>
        <div className="text-zinc-300">Resume Analyzer</div>
        <div className="text-zinc-300">Career Roadmap</div>
        <div className="text-zinc-300">Interview Copilot</div>
      </nav>
    </aside>
  );
}