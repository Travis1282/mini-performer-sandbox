import { http, HttpResponse } from 'msw'

export const handlers = [
  http.post('http://localhost:5173/rest/sessions', () => {
    return HttpResponse.json({
      sessionId: 'c10d9a5d-92e8-4681-b1e1-91ec0fb7c1bd',
      profileId: 'b3ce35f9-b388-439c-b583-b77b7a5141d6',
      profileData:
        'eyJwcm9maWxlSWQiOiIyODk5MGFhMy0wZDc3LTQxZWUtYTk5MC1jMTQ5OTgwNGEwZTYiLCJ1cmwiOiJodHRwOi8vbG9jYWxob3N0OjUxNzMvIiwidXNlckFnZW50IjoiTW96aWxsYS81LjAgKGlQaG9uZTsgQ1BVIGlQaG9uZSBPUyAxN180XzEgbGlrZSBNYWMgT1MgWCkgQXBwbGVXZWJLaXQvNjA1LjEuMTUgKEtIVE1MLCBsaWtlIEdlY2tvKSBWZXJzaW9uLzE3LjQuMSBNb2JpbGUvMTVFMTQ4IFNhZmFyaS82MDQuMSIsInJlZmVycmVyIjoiaHR0cDovL2xvY2FsaG9zdDo1MTczLyJ9',
      sessionData:
        'N4d6VD2xkmaziteJZOeuAx0tfcCSD4jUrzGsNnueeYS8-_subYjp-sC9RfaEfeojcdBRfyb_jerydnmdvrz8E_PD_6XIE3XVprE0S_pikm39tQAvZDLjuKBtn7Tcy1Ils5BWi8SVSO2FbTVww4zUCfLkrriokX_dYI76S5wgn9Kd14K5ZiYLnTuiRathdwX798E_HarokGEQxf-Hos3aOwduonsq4Mh_DQ6ODqsSj8o.7tDChdJOA2MPAfQIdA974-zwab7x9M6tEzH1evpdDdw',
      status: 'ok',
    })
  }),
  http.get(
    'http://localhost:5173/rest/experiments/features/sdk-nBR0cXqdj9rICERK',
    () => {
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
