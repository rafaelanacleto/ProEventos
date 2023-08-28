using ProEventos.Application.Dtos;

namespace ProEventos.Application.Contratos
{
    public interface IEventosService
    {
        //EVENTOS
        Task<EventoDto> AddEventos(EventoDto model);
        Task<EventoDto> UpdateEvento(int id, EventoDto model);
        Task<bool> DeleteEvento(int id);

        Task<EventoDto[]> GetAllEventoAsync(bool includePalestrante);
        Task<EventoDto> GetEventoByIdAsync(int EventoID, bool includePalestrante = false);

    }
}