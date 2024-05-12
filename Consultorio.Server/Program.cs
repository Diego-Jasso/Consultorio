using Consultorio.Server.Repositories;
using Consultorio.Server.Repositories.Impl;
using Consultorio.Server.Services;
using Consultorio.Server.Services.Impl;
using Microsoft.EntityFrameworkCore;
using Consultorio.Server.Mapper;

var builder = WebApplication.CreateBuilder(args);


var connectionString = builder.Configuration.GetConnectionString("MySQLContext");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(
         connectionString ?? throw new InvalidOperationException("Connection string 'MySQLContext' not found."),
         ServerVersion.AutoDetect(connectionString),
         mysqlOptions => mysqlOptions.EnableRetryOnFailure()
    )
);

// Add services to the container.

builder.Services.AddScoped<IArmazonRepository, ArmazonRepository>();

builder.Services.AddScoped<IArmazonService, ArmazonService>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

string corsConfiguration = "_corsConfiguration";
string url = "https://localhost:4200";

builder.Services.AddAutoMapper(typeof(MapperCode));

builder.Services.AddCors(options =>
    options.AddPolicy(name: corsConfiguration,
        cors => cors.WithOrigins(url)
        .AllowAnyHeader()
        .AllowAnyMethod()
    )
);

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(corsConfiguration);

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
