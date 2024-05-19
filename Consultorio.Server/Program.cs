using Consultorio.Server.Repositories;
using Consultorio.Server.Repositories.Impl;
using Consultorio.Server.Services;
using Consultorio.Server.Services.Impl;
using Microsoft.EntityFrameworkCore;
using Consultorio.Server.Mapper;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

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

builder.Services.AddScoped<IMicaRepository,MicaRepository>();

builder.Services.AddScoped<IMicaService, MicaService>();
builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();
builder.Services.AddScoped<IUsuarioValidatorService, UsuarioValidatorService>();
builder.Services.AddScoped<IUsuarioService, UsuarioService>();
builder.Services.AddScoped<ITokenServices, TokenService>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "Ingresar Bearer [Espacio] token \r\n\r\n " +
                        "Ejemplo: Bearer ejoy<8878845468451418",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Scheme = "Bearer"
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement()
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                },
                Scheme = "oauth2",
                Name = "Bearer",
                In = ParameterLocation.Header
            },
            new List<string>()
        }
    });
});

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

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(option =>
                {
                    option.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["TokenKey"])),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });
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
