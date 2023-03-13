using ProEventos.Domain.Models;

namespace ProEventos.Application.Contratos
{
    public interface IEventosService
    {  
         //EVENTOS
         Task<Evento[]> GetAllEventoAsyncByTema(string tema, bool includePalestrante);
         Task<Evento[]> GetAllEventoAsync(bool includePalestrante);
         Task<Evento> GetAllEventoAsyncById(int EventoID, bool includePalestrante);

    }
}