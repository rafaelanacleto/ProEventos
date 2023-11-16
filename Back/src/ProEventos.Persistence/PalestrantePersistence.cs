using Microsoft.EntityFrameworkCore;
using ProEventos.Domain.Models;
using ProEventos.Persistence.Context;
using ProEventos.Persistence.Repositories;

namespace ProEventos.Persistence
{
    public class PalestrantePersistence : IPalestrantePersist
    {

        private readonly ProEventosContext _context;

        public PalestrantePersistence(ProEventosContext context)
        {
            _context = context;
            _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public void DeleteRange<T>(T[] entity) where T : class
        {
            _context.RemoveRange(entity);
        }

        public async Task<Palestrante[]> GetAllPalestranteAsync(bool includeEventos)
        {
            IQueryable<Palestrante> query = _context.Palestrantes
              .Include(c => c.RedesSociais);

            if (includeEventos)
            {
                query = query.Include(p => p.PalestrantesEventos).ThenInclude(p => p.Evento);
            }

            query = query.OrderBy(n => n.User.PrimeiroNome);
            return await query.ToArrayAsync();
        }

        public async Task<Palestrante> GetAllPalestranteAsync(int PalestranteID, bool includeEventos)
        {
            IQueryable<Palestrante> query = _context.Palestrantes
               .Include(c => c.RedesSociais);

            if (includeEventos)
            {
                query = query.Include(p => p.PalestrantesEventos).ThenInclude(p => p.Evento);
            }

            query = query.OrderBy(n => n.User.PrimeiroNome).Where(p => p.Id == PalestranteID);
            return await query.FirstOrDefaultAsync();
        }

        public async Task<Palestrante[]> GetAllPalestranteAsyncByName(string nome, bool includeEventos)
        {
            IQueryable<Palestrante> query = _context.Palestrantes
               .Include(c => c.RedesSociais);

            if (includeEventos)
            {
                query = query.Include(p => p.PalestrantesEventos).ThenInclude(p => p.Evento);
            }

            query = query.OrderByDescending(n => n.User.PrimeiroNome).Where(n => n.User.PrimeiroNome == nome);
            return await query.ToArrayAsync();
        }

        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }

        public void Update<T>(T entity) where T : class
        {
            _context.Update(entity);
        }
    }
}