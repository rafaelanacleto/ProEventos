using AutoMapper;
using Microsoft.Extensions.Logging;
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
        private readonly IMapper _mapper;

        public EventoService(IGeralPersist geralPErsist,
                             IMapper mapper,
                             IEventoPersist eventoPersist)
        {
            this._eventoPersist = eventoPersist;
            this._geralPErsist = geralPErsist;
            this._mapper = mapper;
        }

        public async Task<EventoDto> AddEventos(EventoDto model)
        {
            try
            {
                _geralPErsist.Add<EventoDto>(model);

                if (await _geralPErsist.SaveChangesAsync())
                {

                    var eventoRetorno = _mapper.Map<EventoDto>(await _eventoPersist.GetAllEventoAsyncById(model.Id));

                    return eventoRetorno;
                }

                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> DeleteEvento(int id)
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

        public async Task<EventoDto[]> GetAllEventoAsync(bool includePalestrante)
        {
            try
            {
                var eventos = await _eventoPersist.GetAllEventoAsync(includePalestrante);

                if(eventos == null) return null;

                var resultado = _mapper.Map<EventoDto[]>(eventos);

                return resultado;            
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


        public async Task<EventoDto> UpdateEvento(int id, EventoDto model)
        {
            try
            {
                var evento = await _eventoPersist.GetAllEventoAsyncById(id);

                if (evento == null)
                    return null;

                model.Id = evento.Id;              
                _mapper.Map(model, evento);

                _geralPErsist.Update<Evento>(evento);

                if (await _geralPErsist.SaveChangesAsync())
                {
                    var eventoRetorno = await _eventoPersist.GetEventoByIdAsync(evento.Id, false);

                    return _mapper.Map<EventoDto>(eventoRetorno);
                }

                return null;

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<EventoDto> GetEventoByIdAsync(int id, bool includePalestrante = false)
        {
            try
            {
                var eventos = await _eventoPersist.GetEventoByIdAsync(id, includePalestrante);
                if (eventos == null) return null;

                var eventoRetorno = _mapper.Map<EventoDto>(eventos);

                return eventoRetorno;
            }
            catch (System.Exception)
            {                
                throw;
            }
        }

    }
}