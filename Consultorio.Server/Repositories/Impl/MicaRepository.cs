using Consultorio.Server.Base.Impl;
using Consultorio.Server.DTOs;
using Consultorio.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace Consultorio.Server.Repositories.Impl
{
    public class MicaRepository(AppDbContext context) : BaseRepository<Mica>(context),IMicaRepository
    {
        private readonly AppDbContext _context = context;
       

        public IEnumerable<MicaDTO> ConsultarDTO()
        {
            IEnumerable<Mica> query = context.Mica.ToList();
            return from ta in query
                   select new MicaDTO
                   {
                       micaid = ta.micaid,
                       nombre = ta.nombre,
                       descripcion = ta.descripcion,
                       precio = ta.precio,
                       cantidad_disponible = ta.cantidad_disponible
                   };
        }

        public Mica ConsultarPorId(int id)
        {
            return _context.Mica.Find(id);
        }
    }
}
