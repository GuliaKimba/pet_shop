import { createPortal } from 'react-dom'

export function Modal({ isModalOpenSingUp, isModalOpenSing, children }) {
  if (!isModalOpenSingUp && !isModalOpenSing) return null

  return createPortal(children, document.getElementById('modal'))
}
