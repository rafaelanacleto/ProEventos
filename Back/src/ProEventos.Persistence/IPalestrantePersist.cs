using ProEventos.Domain.Models;

namespace ProEventos.Persistence
{
    public interface IProEventosPersistence
    {
         //PALESTRANTE
         Task<Palestrante[]> GetAllPalestranteAsyncByName(string nome, bool includeEventos);
         Task<Palestrante[]> GetAllPalestranteAsync(bool includeEventos);
         Task<Palestrante> GetAllPalestranteAsync(int PalestranteID, bool includeEventos);
    }
}