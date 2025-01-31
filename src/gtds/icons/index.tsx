import type { ImageProps } from 'next/image'
import clsx from 'clsx'
import Image from 'next/image'
import { icons, svgIcon } from './SVGComponents'

export type IconProps = React.SVGProps<SVGSVGElement>

export type ImageIconProps = {
  width: number
  height: number
  className?: string
} & Omit<ImageProps, 'alt' | 'src'>

// After change every icon to .svg, remove IconProps
export type IconComponentProps = (IconProps | ImageIconProps) & {
  name: keyof typeof icons | keyof typeof svgIcon
}

export default function Icon({ name, ...rest }: IconComponentProps) {
  const Icon = icons[name as keyof typeof icons]
  const ImageIcon = svgIcon[name as keyof typeof svgIcon]

  if (ImageIcon) {
    const { width, height } = rest as ImageIconProps
    return (
      <Image
        alt={`${name} icon`}
        className={clsx(rest.className, `w-[${width}px] h-[${height}px]`)}
        height={height}
        loading="lazy"
        src={ImageIcon}
        style={{ objectFit: 'contain' }}
        unoptimized
        width={width}
      />
    )
  }

  if (Icon) {
    const svgProps = rest as IconProps
    return <Icon {...svgProps} />
  }

  return null
}
