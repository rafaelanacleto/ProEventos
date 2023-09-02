using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ProEventos.Application.Dtos
{
    public class EventoDto
    {
        public int Id { get; set; }
        public string? Local { get; set; }
        public string? DataEvento { get; set; }
        [Required(ErrorMessage = "o campo {0} � obrigat�rio.")]
        [MinLength(3, ErrorMessage = "{0} deve ter no m�nimo 4 caractere")]
        public string? Tema { get; set; }
        public int QtdPessoas { get; set; }
        public string? Lote { get; set; }
        public string? ImagemURL { get; set; }
        [Phone]
        public string? Telefone { get; set; }
        [EmailAddress]
        public string Email { get; set; }
        public List<LoteDto>? Lotes { get; set; }
        public List<RedeSocialDto>? RedesSociais { get; set; }
        public List<PalestranteDto>? Palestrantes { get; set; }
    }
}