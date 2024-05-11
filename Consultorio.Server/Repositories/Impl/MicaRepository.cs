using Consultorio.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace Consultorio.Server.Repositories.Impl
{
    public class MicaRepository(AppDbContext context) : IMicaRepository
    {
        private readonly AppDbContext _context = context;
        public async Task<int> Add(Mica mica)
        {
            _context.Add(mica);
            return await _context.SaveChangesAsync();
        }

        public async Task<int> Delete(Mica mica)
        {
            _context.Remove(mica);
            return await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Mica>> GetAll()
        {
            var micas = await _context.mica.ToListAsync();
            return micas;
        }

        public async Task<Mica?> GetById(int id)
        {
            return await _context.mica.FindAsync(id);
        }

        public async Task<int> Update(Mica mica)
        {
            _context.Update(mica);
            return await _context.SaveChangesAsync();
        }
    }
}
