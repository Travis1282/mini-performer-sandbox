// import type { LoaderFunctionArgs } from 'react-router'
// import { getEventMetadata } from '@/services/maverick/getEventMetadata'

// export function loader({ request, params }: LoaderFunctionArgs) {
//   return getEventMetadata({
//     init: {
//       signal: request.signal,
//     },
//     params: {
//       path: {
//         'event-id': Number(params.eventId),
//       },
//     },
//   })
// }
export function loader() {
  return Promise.resolve({
    data: {
      id: 1,
      name: 'Test',
    },
  })
}

export default loader
