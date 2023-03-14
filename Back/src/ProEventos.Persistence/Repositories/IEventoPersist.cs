using ProEventos.Domain.Models;

namespace ProEventos.Persistence.Repositories
{
    public interface IEventoPersist
    {  
         //EVENTOS
         Task<Evento[]> GetAllEventoAsyncByTema(string tema, bool includePalestrante = false);
         Task<Evento[]> GetAllEventoAsync(bool includePalestrante);
         Task<Evento> GetAllEventoAsyncById(int EventoID, bool includePalestrante = false);

    }
}