using Consultorio.Server.Models;
using Microsoft.EntityFrameworkCore;
using Consultorio.Server.Repositories;
using Microsoft.AspNetCore.Http.HttpResults;

namespace Consultorio.Server.Repositories.Impl
{
    public class ArmazonRepository(AppDbContext context): IArmazonRepository
    {
        private readonly AppDbContext _context = context;

        public async Task<int> Add(Armazon armazon)
        {
            _context.Add(armazon);
            return await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Armazon>> GetAll()
        {
            var armazones = await _context.armazon.ToListAsync();
            return armazones;
        }

        public Task<bool> ExistsModelo(string modelo)
        {
            return _context.armazon.AnyAsync(armazon => armazon.modelo == modelo.ToLower());
        }

        public Task<bool> ExistsId(int armazonId)
        {
            return _context.armazon.AnyAsync(armazon => armazon.armazonid == armazonId);
        }

        public async Task<int> Delete(Armazon armazon)
        {
            _context.Remove(armazon);
            return await _context.SaveChangesAsync();

        }

        public async Task<int> Update(Armazon armazon)
        {
            _context.Update(armazon);
            return await _context.SaveChangesAsync();
        }

        public async Task<Armazon?> GetById(int armazonId)
        {
            return await _context.armazon.FindAsync(armazonId);
        }
    }
}
