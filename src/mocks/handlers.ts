import { http, HttpResponse } from 'msw'

export const handlers = [
  // Intercept "GET https://example.com/user" requests...
  http.post('http://localhost:5173/rest/sessions', () => {
    // ...and respond to them using this JSON response.
    return HttpResponse.json({
      sessionId: 'c10d9a5d-92e8-4681-b1e1-91ec0fb7c1bd',
      profileId: 'b3ce35f9-b388-439c-b583-b77b7a5141d6',
      status: 'ok',
    })
  }),
  http.get(
    'http://localhost:5173/rest/experiments/features/sdk-nBR0cXqdj9rICERK',
    () => {
      // ...and respond to them using this JSON response.
      return HttpResponse.json({
        status: 200,
        features: {
          'top-events-rollout-test': {
            defaultValue: false,
            rules: [
              {
                force: true,
                coverage: 0.5,
                hashAttribute: 'id',
              },
            ],
          },
          'experiment-reporting-a-a-test': {
            defaultValue: false,
          },
          'all-in-pricing': {
            defaultValue: false,
          },
        },
        dateUpdated: '2025-01-31T22:22:00.270Z',
      })
    }
  ),
]
