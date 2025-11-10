export default function MatchesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50">
      {children}
    </div>
  );
}
