using Consultorio.Server.Models;
using Microsoft.EntityFrameworkCore;
using Consultorio.Server.Repositories;

namespace Consultorio.Server.Repositories.Impl
{
    public class ArmazonRepository(AppDbContext context): IArmazonRepository
    {
        private readonly AppDbContext _context = context;

        public async Task<Armazon> AddArmazon(Armazon armazon)
        {
            _context.Add(armazon);
            await _context.SaveChangesAsync();
            return armazon;
        }

        public async Task<IEnumerable<Armazon>> GetArmazones()
        {
            var armazones = await _context.armazon.ToListAsync();
            return armazones;
        }

        public Task<bool> Exists(string modelo)
        {
            return _context.armazon.AnyAsync(armazon => armazon.modelo == modelo.ToLower());
        }
    }
}
