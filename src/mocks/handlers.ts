import { http, HttpResponse } from 'msw'
 
export const handlers = [
  http.get(
    '/api/tournaments', () => {
    // Note that you DON'T have to stringify the JSON!
    return HttpResponse.json({
      data: [
        { Id: 123, Title: 'Foo1', Date: '2024-09-01' },
        { Id: 124, Title: 'Foo2', Date: '2024-10-01' },
        { Id: 125, Title: 'Foo3', Date: '2024-11-01' },
        { Id: 126, Title: 'Foo4', Date: '2024-12-01' },
        // Add more mock data as needed
      ],
    })
  }),
  http.get(
    '/api/tournaments/:id', () => {
    // Note that you DON'T have to stringify the JSON!
    return HttpResponse.json({
      data: [
        { Id: 123, Title: 'Foo1', Date: '2024-09-01' },
        { Id: 124, Title: 'Foo2', Date: '2024-10-01' },
        { Id: 125, Title: 'Foo3', Date: '2024-11-01' },
        { Id: 126, Title: 'Foo4', Date: '2024-12-01' },
        // Add more mock data as needed
      ],
    })
  }),
]