import clsx from 'clsx'
import React from 'react'

interface HurryStickProps {
  content?: React.ReactNode
  narrowContainer?: boolean
}

export const HurryStick: React.FC<HurryStickProps> = ({
  content,
  narrowContainer,
}) => {
  return (
    <div
      className={clsx(
        'w-full bg-[#FE5C36] bg-opacity-10 py-2.5',
        narrowContainer ? 'narrow-container !mt-4 rounded-md' : 'container'
      )}
      data-testid="hurry-stick"
    >
      <div className="text-dark container px-2 text-center text-[13px] font-semibold lg:text-[15px]">
        {content ?? (
          <>
            <span className="font-semibold text-[#FE5C36]">Hurry!</span>
            This is a high demand event and tickets are selling quickly, get
            yours before they’re gone.
          </>
        )}
      </div>
    </div>
  )
}
