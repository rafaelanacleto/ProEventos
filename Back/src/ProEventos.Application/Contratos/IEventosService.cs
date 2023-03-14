using ProEventos.Domain.Models;

namespace ProEventos.Application.Contratos
{
    public interface IEventosService
    {
        //EVENTOS
        Task<Evento> AddEventos(Evento model);
        Task<Evento> UpdateEvento(int id, Evento model);
        Task<bool> DeleteEvento(int id);

        Task<Evento[]> GetAllEventoAsyncByTema(string tema, bool includePalestrante = false);
        Task<Evento[]> GetAllEventoAsync(bool includePalestrante);
        Task<Evento> GetAllEventoAsyncById(int EventoID, bool includePalestrante = false);

    }
}