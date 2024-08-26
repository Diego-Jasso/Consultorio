using Consultorio.Server.Base.Impl;
using Consultorio.Server.DTOs;
using Consultorio.Server.Models;

namespace Consultorio.Server.Repositories.Impl
{
    public class LenteDeContactoRepository(AppDbContext context) : BaseRepository<lenteDeContacto>(context),ILenteDeContactoRepository
    {
        private readonly AppDbContext _context = context;


        public IEnumerable<lenteDeContactoDTO> ConsultarDTO()
        {
            IEnumerable<lenteDeContacto> query = context.LenteDeContacto.ToList();
            return from m in query
                   select new lenteDeContactoDTO
                   {
                       Id = m.Id,
                       Tipo = m.Tipo,
                       Marca = m.Marca,
                       precio = m.precio
                   };
        }

        public lenteDeContacto ConsultarPorId(int id)
        {
            return _context.LenteDeContacto.Find(id);
        }
    }
}
