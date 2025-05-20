export interface LoaderProps {
  className?: string
  height: number
  radius: number
  width: number
}

export default function Loader({
  radius,
  width,
  height,
  className,
}: LoaderProps) {
  return (
    <div
      className={`animate-spin rounded-full border-solid border-[#d6d6d6] border-t-accent ${className}`}
      data-testid="loader"
      style={{
        height: `${height}px`,
        width: `${width}px`,
        borderWidth: `${radius}px`,
      }}
    ></div>
  )
}
