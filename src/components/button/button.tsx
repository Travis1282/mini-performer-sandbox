export function Button({ children }: { children: React.ReactNode }) {
  return (
    <button className="transition-colors inline-flex items-center justify-center whitespace-nowrap text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 px-4 py-3 rounded-md font-semibold">
      {children}
    </button>
  );
}
