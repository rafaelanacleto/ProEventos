using ProEventos.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProEventos.Application.Dtos
{
    public class RedeSocialDto
    {
        public int Id { get; set; }
        public string? Nome { get; set; }
        public string? Url { get; set; }
        public int? EventoId { get; set; }
        public EventoDto Evento { get; }
        public int? PalestranteId { get; set; }
        public PalestranteDto Palestrante { get; }
    }
}