using ProEventos.Application.Contratos;
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

        public async Task<Evento> AddEventos(Evento model)
        {
            try
            {
                _geralPErsist.Add<Evento>(model);

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

        public Task<Evento[]> GetAllEventoAsync(bool includePalestrante)
        {
            throw new NotImplementedException();
        }

        public Task<Evento> GetAllEventoAsyncById(int EventoID, bool includePalestrante = false)
        {
            throw new NotImplementedException();
        }

        public Task<Evento[]> GetAllEventoAsyncByTema(string tema, bool includePalestrante = false)
        {
            throw new NotImplementedException();
        }

        public async Task<Evento> UpdateEvento(int id, Evento model)
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