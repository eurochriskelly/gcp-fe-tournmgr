import { http, HttpResponse } from 'msw';
import testdata from 'gcp-core/dist/esm/test/test-data.js';

const tournaments = Object.values(testdata.tournaments);
 
export const handlers = [
  http.get(
    '/api/tournaments', () => {
    // Note that you DON'T have to stringify the JSON!
    return HttpResponse.json({
      data: tournaments.map(t => ({
        tournamentId: t.tournamentId,
        description: t.description,
        date: t.startDate,
      }))
    })
  }),
  // Handle requests for a specific tournament by ID
  http.get('/api/tournaments/:tournamentId', (req, res, ctx) => {
    const { tournamentId } = req.params;
    const tournament = tournaments.find(t => t.tournamentId === Number(tournamentId));
  
    console.log('tt', tournament)
    if (tournament) {
      return HttpResponse.json(tournament);
    } else {
      return res(
        ctx.status(404),
        ctx.json({ error: 'Tournament not found' })
      );
    }
  })
]