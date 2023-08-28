using ProEventos.Application.Contratos;
using ProEventos.Application.Dtos;
using ProEventos.Domain.Models;
using ProEventos.Persistence.Repositories;

namespace ProEventos.Application
{
    public class EventoService : IEventosService
    {
        private readonly IGeralPersist _geralPErsist;
        private readonly IEventoPersist _eventoPersist;

        public EventoService(IGeralPersist geralPErsist,
                             IEventoPersist eventoPersist)
        {
            this._eventoPersist = eventoPersist;
            this._geralPErsist = geralPErsist;
        }

        public async Task<EventoDto> AddEventos(EventoDto model)
        {
            try
            {
                _geralPErsist.Add<EventoDto>(model);

                if (await _geralPErsist.SaveChangesAsync())
                {
                    return await _eventoPersist.GetAllEventoAsyncById(model.Id);
                }

                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> DeleteEvento(int id, Evento model)
        {
            try
            {
                var evento = await _eventoPersist.GetAllEventoAsyncById(id);

                if (evento == null)
                    return false;

                _geralPErsist.Delete<Evento>(evento);

                if (await _geralPErsist.SaveChangesAsync())
                {
                    return true;
                }

                return false;

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Evento[]> GetAllEventoAsync(bool includePalestrante)
        {
            try
            {
                var eventos = await _eventoPersist.GetAllEventoAsync(includePalestrante);

                if(eventos == null) return null;

                return eventos;                
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Evento> GetAllEventoAsyncById(int EventoID, bool includePalestrante = false)
        {
            try
            {
                var evento = await _eventoPersist.GetAllEventoAsyncById(EventoID, includePalestrante);

                if(evento == null) return null;

                return evento;                
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Evento[]> GetAllEventoAsyncByTema(string tema, bool includePalestrante = false)
        {
            try
            {
                var eventos = await _eventoPersist.GetAllEventoAsyncByTema(tema, includePalestrante);

                if(eventos == null) return null;

                return eventos;                
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Evento> UpdateEvento(int id, EventoDto model)
        {
            try
            {
                var evento = await _eventoPersist.GetAllEventoAsyncById(id);

                if (evento == null)
                    return null;

                _geralPErsist.Update<Evento>(model);

                if (await _geralPErsist.SaveChangesAsync())
                {
                    return await _eventoPersist.GetAllEventoAsyncById(model.Id);
                }

                return null;

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}