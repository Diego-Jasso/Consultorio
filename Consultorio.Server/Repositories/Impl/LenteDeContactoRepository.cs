using Consultorio.Server.Base.Impl;
using Consultorio.Server.DTOs;
using Consultorio.Server.Models;

namespace Consultorio.Server.Repositories.Impl
{
    public class LenteDeContactoRepository(AppDbContext context) : BaseRepository<lentesDeContacto>(context),ILentesDeContactoRepository
    {
        private readonly AppDbContext _context = context;


        public IEnumerable<lenteDeContactoDTO> ConsultarDTO()
        {
            IEnumerable<lentesDeContacto> query = context.LenteDeContacto.ToList();
            return from m in query
                   select new lenteDeContactoDTO
                   {
                       id = m.Id,
                       Descripcion = m.Descripcion,
                       precio = m.precio
                   };
        }

        public lentesDeContacto ConsultarPorId(int id)
        {
            return _context.LenteDeContacto.Find(id);
        }
    }
}
