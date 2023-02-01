using Microsoft.AspNetCore.Mvc;
using ProEventos.API.Data;
using ProEventos.API.Models;

namespace ProEventos.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EventoController : ControllerBase
{

    private readonly DataContext _context;

    public EventoController(DataContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IEnumerable<Evento> Get()
    {
        return _context.Eventos.ToList();
    }

    [HttpGet("{id}")]
    public Evento GetById(int? id)
    {
        return _context.Eventos.FirstOrDefault(evento => evento.Id == id);
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
