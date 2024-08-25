using Consultorio.Server.Base.Impl;
using Consultorio.Server.DTOs;
using Consultorio.Server.Models;

namespace Consultorio.Server.Repositories.Impl
{
    public class TratamientosServiciosRepository(AppDbContext context) : BaseRepository<tratamientosServicios>(context),ITratamientosServiciosRepository
    {
        private readonly AppDbContext _context = context;


        public IEnumerable<tratamientosServiciosDTO> ConsultarDTO()
        {
            IEnumerable<tratamientosServicios> query = context.TratamientosServicios.ToList();
            return from m in query
                   select new tratamientosServiciosDTO
                   {
                       Id = m.Id,
                       descripcion = m.descripcion,
                       precio = m.precio
                   };
        }

        public tratamientosServicios ConsultarPorId(int id)
        {
            return _context.TratamientosServicios.Find(id);
        }
    }
}
