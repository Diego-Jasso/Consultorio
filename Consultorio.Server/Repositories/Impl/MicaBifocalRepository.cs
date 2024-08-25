using Consultorio.Server.Base.Impl;
using Consultorio.Server.DTOs;
using Consultorio.Server.Models;

namespace Consultorio.Server.Repositories.Impl
{
    public class MicaBifocalRepository(AppDbContext context) : BaseRepository<micaBifocal>(context),IMicaBifocalRepository
    {
        private readonly AppDbContext _context = context;


        public IEnumerable<micaBifocalDTO> ConsultarDTO()
        {
            IEnumerable<micaBifocal> query = context.MicaBifocal.ToList();
            return from m in query
                   select new micaBifocalDTO
                   {
                       Id = m.Id,
                       Marca = m.Marca,
                       precioDuoDigital = m.precioDuoDigital,
                       precioFlatTop28 = m.precioFlatTop28
                   };
        }

        public micaBifocal ConsultarPorId(int id)
        {
            return _context.MicaBifocal.Find(id);
        }
    }
}
