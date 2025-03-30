import { debounce } from "lodash";
import { MouseEvent, ReactNode, useCallback } from "react";


const DEBOUNCE_INTERVAL = 300;
interface PrimaryButtonProps {
  size: string
  bgColor: string
  textColor: string
  children: ReactNode;
  onClick: (e: MouseEvent<HTMLElement>) => void
}

const PrimaryButton = ({ size, bgColor, textColor, children, onClick }: PrimaryButtonProps): JSX.Element => {
  const debouncedClick = useCallback(debounce(
    (e: MouseEvent<HTMLElement>) => {
      onClick(e)
    },
    DEBOUNCE_INTERVAL,
    { leading: true, trailing: false, maxWait: DEBOUNCE_INTERVAL }
  ), [])

  return (
    <button className={`cursor-pointer rounded-[10px] text-${textColor} py-4 px-[50px] bg-accent-800 text-2xl font-bold capitalize`}
      onClick={e => debouncedClick(e)}
    >{children}</button>
  )
}

export default PrimaryButton;