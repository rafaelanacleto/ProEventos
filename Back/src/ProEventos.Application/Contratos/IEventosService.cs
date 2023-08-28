using ProEventos.Application.Dtos;

namespace ProEventos.Application.Contratos
{
    public interface IEventosService
    {
        //EVENTOS
        Task<EventoDto> AddEventos(EventoDto model);
        Task<EventoDto> UpdateEvento(int id, EventoDto model);
        Task<bool> DeleteEvento(int id, EventoDto model);

        Task<EventoDto[]> GetAllEventoAsyncByTema(string tema, bool includePalestrante = false);
        Task<EventoDto[]> GetAllEventoAsync(bool includePalestrante);
        Task<EventoDto> GetAllEventoAsyncById(int EventoID, bool includePalestrante = false);

    }
}