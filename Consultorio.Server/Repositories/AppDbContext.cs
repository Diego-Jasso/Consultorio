using Consultorio.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace Consultorio.Server.Repositories
{
    public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
    {
        public DbSet<Armazon> Armazon { get; set; } = default!;

        public DbSet<Mica> Mica { get; set; } = default!;

        public DbSet<Usuario> Usuario { get; set; } = default!;
    }
}
