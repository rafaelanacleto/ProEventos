using Microsoft.EntityFrameworkCore;
using ProEventos.Persistence;
using ProEventos.Persistence.Context;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddCors();

builder.Services.AddControllers();
builder.Services.AddDbContext<ProEventosContext>(con => con.UseSqlite(builder.Configuration.GetConnectionString("Default")));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

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
