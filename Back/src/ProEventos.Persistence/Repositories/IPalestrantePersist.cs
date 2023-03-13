using ProEventos.Domain.Models;

namespace ProEventos.Persistence.Repositories
{
    public interface IPalestrantePersist
    {
         //PALESTRANTE
         Task<Palestrante[]> GetAllPalestranteAsyncByName(string nome, bool includeEventos);
         Task<Palestrante[]> GetAllPalestranteAsync(bool includeEventos);
         Task<Palestrante> GetAllPalestranteAsync(int PalestranteID, bool includeEventos);
    }
}