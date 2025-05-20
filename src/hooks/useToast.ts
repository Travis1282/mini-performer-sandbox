import { useToastContext } from '@/contexts/ToastContext'

export function useToast() {
  const { toast, setId } = useToastContext()

  return { toast, setId }
}
