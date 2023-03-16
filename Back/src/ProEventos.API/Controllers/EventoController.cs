using Microsoft.AspNetCore.Mvc;
using ProEventos.Domain.Models;
using ProEventos.Persistence.Context;
using ProEventos.Application;
using ProEventos.Application.Contratos;

namespace ProEventos.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EventoController : ControllerBase
{

    private readonly IEventosService _service;

    public EventoController(IEventosService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        try
        {
            var eventos = await _service.GetAllEventoAsync(true);
            if (eventos == null) return NotFound("Nenhum Evento Encontrado.");

            return Ok(eventos);
        }
        catch (Exception ex)
        {
            return this.StatusCode(StatusCodes.Status500InternalServerError, 
                $"Erro ao tentar enviar o erro, ERRO: {ex.Message}");
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
         try
        {
            var eventos = await _service.GetAllEventoAsyncById(id, true);
            if (eventos == null) return NotFound("Nenhum Evento Encontrado.");

            return Ok(eventos);
        }
        catch (Exception ex)
        {
            return this.StatusCode(StatusCodes.Status500InternalServerError, 
                $"Erro ao tentar enviar o erro, ERRO: {ex.Message}");
        }
    }

    [HttpPost]
    public IEnumerable<Evento> Post(Evento model)
    {
        return _context.Eventos.Append(model);
    }

    [HttpPut("{id}")]
    public string Put(int id)
    {
        return $"Put - {id}";
    }

    [HttpDelete("{id}")]
    public string Delete(int id)
    {
        return $"Delete - {id}";
    }
}
