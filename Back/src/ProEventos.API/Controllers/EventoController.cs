using Microsoft.AspNetCore.Mvc;
using ProEventos.API.Models;

namespace ProEventos.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EventoController : ControllerBase
{  
    [HttpGet]
    public Evento Get()
    {
       return new Evento() {
        Id = 1,
        DataEvento = "18/01/2023",
        ImagemURL = "imagem.png",
        Local = "Esteio",
        Lote = "12",
        QtdPessoas = 2,
        Tema = "Angular 12"
       };
    }

    [HttpPost]
    public Evento Post(Evento model)
    {
       return model;
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
