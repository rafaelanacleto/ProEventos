using Microsoft.EntityFrameworkCore;
using ProEventos.Domain.Models;
using ProEventos.Persistence.Context;
using ProEventos.Persistence.Repositories;

namespace ProEventos.Persistence
{
    public class EventoPersistence : IEventoPersist
    {
        private readonly ProEventosContext _context;

        public EventoPersistence(ProEventosContext context)
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

        public async Task<Evento[]> GetAllEventoAsync(bool includePalestrante)
        {
            IQueryable<Evento> query = _context.Eventos
               .Include(c => c.Lotes)
               .Include(c => c.RedesSociais);

            if (includePalestrante)
            {
                query = query.Include(p => p.PalestrantesEventos).ThenInclude(p => p.Palestrante);
            }

            query = query.OrderBy(c => c.Id);
            return await query.ToArrayAsync();
        }

        public async Task<Evento> GetAllEventoAsyncById(int EventoID, bool includePalestrante)
        {
            IQueryable<Evento> query = _context.Eventos
               .Include(c => c.Lotes)
               .Include(c => c.RedesSociais);

            if (includePalestrante)
            {
                query = query.Include(p => p.PalestrantesEventos).ThenInclude(p => p.Palestrante);
            }

            query = query.OrderByDescending(c => c.DataEvento)
                        .Where(c => c.Id == EventoID);
            return await query.FirstOrDefaultAsync();
        }

        public async Task<Evento[]> GetAllEventoAsyncByTema(string tema, bool includePalestrante)
        {
            IQueryable<Evento> query = _context.Eventos
              .Include(c => c.Lotes)
              .Include(c => c.RedesSociais);

            if (includePalestrante)
            {
                query = query.Include(p => p.PalestrantesEventos).ThenInclude(p => p.Palestrante);
            }

            query = query.OrderByDescending(c => c.DataEvento)
                        .Where(c => c.Tema.Contains(tema));
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

        public async Task<Evento> GetEventoByIdAsync(int eventoId, bool includePalestrantes = false)
        {
            IQueryable<Evento> query = _context.Eventos
                .Include(e => e.Lotes)
                .Include(e => e.RedesSociais);

            if (includePalestrantes)
            {
                query = query
                    .Include(e => e.PalestrantesEventos)
                    .ThenInclude(pe => pe.Palestrante);
            }

            query = query.AsNoTracking().OrderBy(e => e.Id)
                         .Where(e => e.Id == eventoId);

            return await query.FirstOrDefaultAsync();
        }
    }
}