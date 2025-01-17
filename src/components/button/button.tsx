export function Button({ children }: { children: React.ReactNode }) {
  return (
    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-blue-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-blue-700 active:bg-blue-800">
      {children}
    </button>
  )
}
