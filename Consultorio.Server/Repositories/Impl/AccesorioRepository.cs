using Consultorio.Server.Base.Impl;
using Consultorio.Server.DTOs;
using Consultorio.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace Consultorio.Server.Repositories.Impl
{
    public class AccesorioRepository(AppDbContext context) : BaseRepository<Accesorio>(context),IAccesorioRepository
    {
        private readonly AppDbContext _context = context;
       

        public IEnumerable<AccesorioDTO> ConsultarDTO()
        {
            IEnumerable<Accesorio> query = context.Accesorio.ToList();
            return from ta in query
                   select new AccesorioDTO
                   {
                       id = ta.id,
                       descripcion = ta.descripcion,
                       precio = ta.precio,
                       cantidad_disponible = ta.cantidad_disponible
                   };
        }

        public Accesorio ConsultarPorId(int id)
        {
            return _context.Accesorio.Find(id);
        }
    }
}
