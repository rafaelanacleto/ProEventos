using Microsoft.AspNetCore.Mvc;
using ProEventos.API.Models;

namespace ProEventos.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EventoController : ControllerBase
{  

    public IEnumerable<Evento> _evento = new Evento[] {
        new Evento() {
        Id = 1,
        DataEvento = "18/01/2023",
        ImagemURL = "imagem.png",
        Local = "Esteio",
        Lote = "12",
        QtdPessoas = 2,
        Tema = "Angular 12"
       },
        new Evento() {
        Id = 2,
        DataEvento = "22/01/2023",
        ImagemURL = "imagem.png",
        Local = "GTI",
        Lote = "2",
        QtdPessoas = 22,
        Tema = "C# 12"
       }
    };

    [HttpGet]
    public IEnumerable<Evento> Get()
    {
       return _evento;
    }

    [HttpGet("{id}")]
    public IEnumerable<Evento> GetById(int? id)
    {
        return _evento.Where(evento => evento.Id == id);         
    }

    [HttpPost]
    public IEnumerable<Evento> Post(Evento model)
    {
       return _evento.Append(model);
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
