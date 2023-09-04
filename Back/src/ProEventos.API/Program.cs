using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ProEventos.Application;
using ProEventos.Application.Contratos;
using ProEventos.Application.Helpers;
using ProEventos.Persistence;
using ProEventos.Persistence.Context;
using ProEventos.Persistence.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddCors();

builder.Services.AddControllers().AddNewtonsoftJson(options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
builder.Services.AddDbContext<ProEventosContext>(con => con.UseSqlite(builder.Configuration.GetConnectionString("Default")));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//config automapper
var config = new MapperConfiguration(cfg =>
{
    cfg.AddProfile(new ProEventosProfile());
});

IMapper mapper = config.CreateMapper();
builder.Services.AddSingleton(mapper);   //services.AddSingleton(mapper);

builder.Services.AddScoped<IEventosService, EventoService>();
builder.Services.AddScoped<ILoteService, LoteService>();
builder.Services.AddScoped<IGeralPersist, GeralPersistence>();
builder.Services.AddScoped<IEventoPersist, EventoPersistence>();
builder.Services.AddScoped<ILotePersist, LotePersist>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else{
    app.UseHttpsRedirection();
}

app.UseCors(
    x => x.AllowAnyHeader()
        .AllowAnyMethod()
        .AllowAnyOrigin()
);

app.UseAuthorization();

app.MapControllers();

app.Run();
