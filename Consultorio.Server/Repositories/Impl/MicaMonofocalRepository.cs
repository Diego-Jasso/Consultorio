using Consultorio.Server.Base.Impl;
using Consultorio.Server.DTOs;
using Consultorio.Server.Models;

namespace Consultorio.Server.Repositories.Impl
{
    public class MicaMonofocalRepository(AppDbContext context) : BaseRepository<micaMonofocal>(context),IMicaMonofocalRepository
    {
        private readonly AppDbContext _context = context;


        public IEnumerable<micaMonofocalDTO> ConsultarDTO()
        {
            IEnumerable<micaMonofocal> query = context.MicaMonofocal.ToList();
            return from m in query
                   select new micaMonofocalDTO
                   {
                       Id = m.Id,
                       Material = m.Material,
                       Modelo = m.Modelo,
                       Categoria = m.Categoria,
                       Precio = m.Precio
                   };
        }

        public micaMonofocal ConsultarPorId(int id)
        {
            return _context.MicaMonofocal.Find(id);
        }
    }
}
