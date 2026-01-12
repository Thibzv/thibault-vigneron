'use client'

import { useRouter } from 'next/navigation'

export default function ModalClose() {
  const router = useRouter()

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault()
    router.back()
  }

  return (
    <button onClick={handleClose} className="modal__close" aria-label="Fermer la modal">
      <span className="icon-cross"></span>
      <span className="icon-cross"></span>
    </button>
  )
}
