using Consultorio.Server.Base.Impl;
using Consultorio.Server.DTOs;
using Consultorio.Server.Models;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace Consultorio.Server.Repositories.Impl
{
    public class ArmazonCotizacionRepository(AppDbContext context): BaseRepository<ArmazonCotizacion>(context), IArmazonCotizacionRepository
    {
        private readonly AppDbContext _context = context;
        public IEnumerable<ArmazonCotizacionDTO> ConsultarDTO(int id)
        {
            IEnumerable<ArmazonCotizacion> query = context.ArmazonCotizacion.Include(a=>a.Armazon).Where(a => a.cotizacionid.Equals(id));

            return from a in query
                   select new ArmazonCotizacionDTO
                   {
                       id= a.id,
                       cotizacionid =a.cotizacionid,
                       armazonid =a.armazonid,
                       modelo = a.Armazon.modelo,
                       marca = a.Armazon.marca,
                       tipo_de_lente = a.Armazon.tipo_de_lente,
                       color = a.Armazon.color,
                       material = a.Armazon.material,
                       precio = a.Armazon.precio,
                       precioTotal = (a.Armazon.precio * a.cantidad),
                       cantidad =a.cantidad
                   };
    
        }

        public double ConsultarPrecioTotal(int id)
        {
            double total =  context.ArmazonCotizacion.Include(a => a.Armazon).Where(a => a.cotizacionid.Equals(id)).Sum(a => a.Armazon.precio * a.cantidad);
            return total;
        }

        public ArmazonCotizacion ConsultarPorId(int id)
        {
            return _context.ArmazonCotizacion.Find(id);
        }

        public ArmazonCotizacion ConsultarPorArmazonId(int id,int cotid)
        {
            return _context.ArmazonCotizacion.Where(ac => ac.armazonid == id && ac.cotizacionid == cotid).FirstOrDefault();
        }
    }
}
