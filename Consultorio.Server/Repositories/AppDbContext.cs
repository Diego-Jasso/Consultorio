using Consultorio.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace Consultorio.Server.Repositories
{
    public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
    {
        public DbSet<Armazon> Armazon { get; set; } = default!;

        public DbSet<Accesorio> Accesorio { get; set; } = default!;

        public DbSet<Usuario> Usuario { get; set; } = default!;

        public DbSet<Cotizacion> Cotizacion { get; set; } = default!;
        public DbSet<Status> Status { get; set; } = default!;
        public DbSet<ArmazonCotizacion> ArmazonCotizacion { get; set; } = default!;
    }
}
