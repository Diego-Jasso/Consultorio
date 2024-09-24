using Consultorio.Server.Base.Impl;
using Consultorio.Server.DTOs;
using Consultorio.Server.Models;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace Consultorio.Server.Repositories.Impl
{
    public class AccesorioCotizacionRepository(AppDbContext context): BaseRepository<AccesorioCotizacion>(context), IAccesorioCotizacionRepository
    {
        private readonly AppDbContext _context = context;
        public IEnumerable<AccesorioCotizacionDTO> ConsultarDTO(int id)
        {
            IEnumerable<AccesorioCotizacion> query = context.AccesorioCotizacion.Include(a=>a.Accesorio).Where(a => a.cotizacionid.Equals(id));

            return from a in query
                   select new AccesorioCotizacionDTO
                   {
                       id= a.Id,
                       cotizacionid =a.cotizacionid,
                       descripcion = a.Accesorio.descripcion,
                       precio = a.Accesorio.precio,
                       precioTotal = (a.Accesorio.precio * a.cantidad),
                       cantidad =a.cantidad
                   };
    
        }

        public double ConsultarPrecioTotal(int id)
        {
            double total =  context.AccesorioCotizacion.Include(a => a.Accesorio).Where(a => a.cotizacionid.Equals(id)).Sum(a => a.Accesorio.precio * a.cantidad);
            return total;
        }

        public AccesorioCotizacion ConsultarPorId(int id)
        {
            return _context.AccesorioCotizacion.Find(id);
        }

        public AccesorioCotizacion ConsultarPorAccesorioId(int id,int cotid)
        {
            return _context.AccesorioCotizacion.Where(ac => ac.accesorioid == id && ac.cotizacionid == cotid).FirstOrDefault();
        }
    }
}
