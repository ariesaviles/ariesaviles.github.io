export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="max-w-7xl mx-auto px-6 lg:px-12 py-8 border-t border-stone-200">
      <div className="flex items-center justify-between">
        <span className="text-xs text-stone-400 font-mono">
          © {year} Aries Aviles
        </span>
        <span className="text-xs text-stone-300 font-mono">
          Built with Next.js
        </span>
      </div>
    </footer>
  );
}
