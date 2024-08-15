using Consultorio.Server.Base.Impl;
using Consultorio.Server.DTOs;
using Consultorio.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace Consultorio.Server.Repositories.Impl
{
    public class ArmazonCotizacionRepository(AppDbContext context): BaseRepository<ArmazonCotizacion>(context), IArmazonCotizacionRepository
    {
        private readonly AppDbContext _context = context;
        public IEnumerable<ArmazonCotizacionDTO> ConsultarDTO(int id)
        {
            IEnumerable<ArmazonCotizacion> query = context.ArmazonCotizacion.Include(a=>a.Armazon).Where(a => a.cotizacionid.Equals(id));

            return from cot in query
                   select new ArmazonCotizacionDTO
                   {
                       cotizacionid = cot.cotizacionid,
                       armazonid = cot.armazonid,
                       modelo = cot.Armazon.modelo,
                       marca = cot.Armazon.marca,
                       tipo_de_lente = cot.Armazon.tipo_de_lente,
                       color = cot.Armazon.color,
                       material = cot.Armazon.material,
                       precio = cot.Armazon.precio,
                       precioTotal = (cot.Armazon.precio * cot.cantidad),
                       cantidad = cot.cantidad
                   };
    
        }

        public ArmazonCotizacion ConsultarPorId(int id)
        {
            return _context.ArmazonCotizacion.Find(id);
        }
    }
}
