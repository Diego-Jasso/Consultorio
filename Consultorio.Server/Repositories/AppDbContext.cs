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
        public DbSet<ArticuloCotizacion> ArticuloCotizacion { get; set; } = default!;
        public DbSet<lenteDeContacto> LenteDeContacto { get; set; } = default!;
        public DbSet<micaMonofocal> MicaMonofocal { get; set; } = default!;
        public DbSet<micaBifocal> MicaBifocal { get; set; } = default!;
        public DbSet<micaProgresivo> MicaProgresivo { get; set; } = default!;
        public DbSet<Mica> Mica { get; set; } = default!;
        public DbSet<AccesorioCotizacion> AccesorioCotizacion { get; set; } = default!;

    }
}
