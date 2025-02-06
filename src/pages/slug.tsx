import NotFound from '@/components/errors/not-found'
import Redirect from '@/services/navigation/redirect'
import { useParams } from 'react-router'

export default function Slug() {
  const params = useParams()

  // test reidrect
  if (params.slug === 'bruno-mars') {
    return <Redirect to="bruno-mars-tickets" />
  }

  if (params.slug === 'bruno-mars-404') {
    return <NotFound />
  }

  return <div>Slug: {params.slug}</div>
}
