import { basePath } from '../config';

export default function Redirect({ to, delay = 0 }: { to: string; delay?: number }) {
  return (
    <>
      <meta content={`${delay}; url=${basePath}/${to}`} httpEquiv="refresh" />
      {delay > 0 && <div className="text-xl">Redirecting in {delay} seconds...</div>}
    </>
  );
}
