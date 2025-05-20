export const Loading = () => (
  <div className="flex h-screen w-screen flex-col items-center justify-center bg-white/80 backdrop-blur-md">
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="goticket-loader" />
      <div className="text-xl font-bold">Loading...</div>
    </div>
  </div>
);
