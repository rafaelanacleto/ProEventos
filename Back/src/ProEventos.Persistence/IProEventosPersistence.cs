using ProEventos.Domain.Models;

namespace ProEventos.Persistence
{
    public interface IProEventosPersistence
    {
          //GERAL
         void Add<T>(T entity) where T : class;
         void Update<T>(T entity) where T : class;
         void Delete<T>(T entity) where T : class;
         void DeleteRange<T>(T[] entity) where T : class;
         Task<bool> SaveChangesAsync();

         //EVENTOS
         Task<Evento[]> GetAllEventoAsyncByTema(string tema, bool includePalestrante);
         Task<Evento[]> GetAllEventoAsync(bool includePalestrante);
         Task<Evento> GetAllEventoAsyncById(int EventoID, bool includePalestrante);

         //PALESTRANTE
         Task<Palestrante[]> GetAllPalestranteAsyncByName(string nome, bool includeEventos);
         Task<Palestrante[]> GetAllPalestranteAsync(bool includeEventos);
         Task<Palestrante> GetAllPalestranteAsync(int PalestranteID, bool includeEventos);
    }
}