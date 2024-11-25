using Consultorio.Server.Base.Impl;
using Consultorio.Server.DTOs;
using Consultorio.Server.Models;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace Consultorio.Server.Repositories.Impl
{
    public class ArticuloCotizacionRepository(AppDbContext context): BaseRepository<ArticuloCotizacion>(context), IArticuloCotizacionRepository
    {
        private readonly AppDbContext _context = context;
        public IEnumerable<ArticuloCotizacionDTO> ConsultarDTO(int id)
        {
            IEnumerable<ArticuloCotizacion> query = context.ArticuloCotizacion.Include(a=>a.Armazon).Where(a => a.cotizacionid.Equals(id));

            return from a in query
                   select new ArticuloCotizacionDTO
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
            double total =  context.ArticuloCotizacion.Include(a => a.Armazon).Where(a => a.cotizacionid.Equals(id)).Sum(a => a.Armazon.precio * a.cantidad);
            return total;
        }

        public ArticuloCotizacion ConsultarPorId(int id)
        {
            return _context.ArticuloCotizacion.Find(id);
        }

        public ArticuloCotizacion ConsultarPorArmazonId(int id,int cotid)
        {
            return _context.ArticuloCotizacion.Where(ac => ac.armazonid == id && ac.cotizacionid == cotid).FirstOrDefault();
        }
    }
}
