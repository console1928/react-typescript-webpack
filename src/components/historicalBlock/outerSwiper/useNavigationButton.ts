import { useRef, useState } from 'react'

const useNavigationButton: () => [
  React.RefObject<HTMLButtonElement | null>,
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>
] = () => {
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const [isButtonRef, setIsButtonRef] = useState(false)
  return [buttonRef, isButtonRef, setIsButtonRef]
}

export default useNavigationButton
