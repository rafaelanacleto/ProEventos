using ProEventos.Domain.Models;

namespace ProEventos.Persistence
{
    public class ProEventosPersistence : IProEventosPersistence
    {

        private readonly ProEventosContext _context;

        public ProEventosPersistence(ProEventosContext context)
        {
            _context = context;
            //this._context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            throw new NotImplementedException();
        }

        public void DeleteRange<T>(T[] entity) where T : class
        {
            throw new NotImplementedException();
        }

        public Task<Evento[]> GetAllEventoAsync(bool includePalestrante)
        {
            throw new NotImplementedException();
        }

        public Task<Evento> GetAllEventoAsyncById(int EventoID, bool includePalestrante)
        {
            throw new NotImplementedException();
        }

        public Task<Evento[]> GetAllEventoAsyncByTema(string tema, bool includePalestrante)
        {
            throw new NotImplementedException();
        }

        public Task<Palestrante[]> GetAllPalestranteAsync(bool includeEventos)
        {
            throw new NotImplementedException();
        }

        public Task<Palestrante> GetAllPalestranteAsync(int PalestranteID, bool includeEventos)
        {
            throw new NotImplementedException();
        }

        public Task<Palestrante[]> GetAllPalestranteAsyncByName(string nome, bool includeEventos)
        {
            throw new NotImplementedException();
        }

        public Task<bool> SaveChangesAsync()
        {
            throw new NotImplementedException();
        }

        public void Update<T>(T entity) where T : class
        {
            throw new NotImplementedException();
        }
    }
}