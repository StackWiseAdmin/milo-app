export default function InternalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FAFAF7] text-gray-800 dark:text-gray-100 dark:bg-[#1e1e1e] px-4 py-8">
      {children}
    </div>
  );
}
