export default function Footer({ owner }: { owner: string }) {
  const year = 2026;
  return (
    <footer className="border-t border-line mt-24">
      <div className="container-wide py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <p className="text-sm text-muted font-sans">
          &copy; {year} {owner}. Built with Next.js &amp; Tailwind CSS.
        </p>
        <p className="text-sm text-muted font-sans">
          Every decision logged in{" "}
          <span className="text-accent font-medium">DECISIONS.md</span>.
        </p>
      </div>
    </footer>
  );
}
