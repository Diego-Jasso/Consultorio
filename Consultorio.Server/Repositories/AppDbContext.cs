using Consultorio.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace Consultorio.Server.Repositories
{
    public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
    {
        public DbSet<Armazon> armazon { get; set; } = default!;

        public DbSet<Mica> mica { get; set; } = default!;

        public DbSet<Usuario> usuario { get; set; } = default!;
    }
}
