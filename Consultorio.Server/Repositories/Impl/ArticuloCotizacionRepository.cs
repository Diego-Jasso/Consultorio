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
            //IEnumerable<ArticuloCotizacion> query = _context.ArticuloCotizacion.Include(ac => _context.Armazon.Where(a => a.armazonid.Equals(ac.armazonid))).Where(a => a.cotizacionid.Equals(id));
            var query = from ac in _context.ArticuloCotizacion
                        join a in _context.Armazon
                        on ac.armazonid equals a.armazonid into armazones
                        from armazon in armazones.DefaultIfEmpty()
                        join m in _context.Mica
                        on ac.micaid equals m.Id into micas
                        from mica in micas.DefaultIfEmpty()
                        join l in _context.LenteDeContacto
                        on ac.micaid equals l.Id into lentesDeContacto
                        from lente in lentesDeContacto.DefaultIfEmpty()
                        where ac.cotizacionid == id
                        select new ArticuloCotizacionDTO
                        {
                            id = ac.id,
                            cotizacionid = ac.cotizacionid,
                            armazonid = ac.armazonid,
                            cantidad = ac.cantidad,
                            tipoMica = ac.tipoMica,
                            micaid = ac.micaid,
                            marca = armazon != null ? armazon.marca : string.Empty,
                            modelo = armazon != null ? armazon.modelo : string.Empty,
                            color = armazon != null ? armazon.color : string.Empty,
                            tipo_de_lente = armazon != null ? armazon.tipo_de_lente : string.Empty,
                            material = armazon != null ? armazon.material : string.Empty,
                            precioArmazon = armazon != null ? armazon.precio : 0,
                            precioMica = ac.tipoMica == "LDC"
                                ? (lente != null ? lente.precio : 0)
                                : (ac.tipoMica != "SIN" ? (mica != null ? mica.precio  : 0) : 0),
                            descripcionMica = ac.tipoMica == "LDC"
                                ? (lente != null ? $"{lente.Tipo} {lente.Marca}" : string.Empty)
                                : (ac.tipoMica != "SIN"
                                    ? ((mica != null && !string.IsNullOrWhiteSpace(mica.descripcion) ? $"{mica.descripcion.Trim()} " : string.Empty) +
                                       (mica != null && !string.IsNullOrWhiteSpace(mica.esfera) ? $"ESFERA {mica.esfera} " : string.Empty) +
                                       (mica != null && !string.IsNullOrWhiteSpace(mica.cilindro) ? $"CILINDRO {mica.cilindro} " : string.Empty) +
                                       (mica != null && !string.IsNullOrWhiteSpace(mica.adiciones) ? $"ADICIONES {mica.adiciones}" : string.Empty))
                                    : "Sin Mica"),
                            materialTratamiento = (ac.tipoMica != "LDC" && ac.tipoMica != "SIN")
                                ? (mica != null ? mica.materialTratamiento : string.Empty)
                                : string.Empty,
                            precioTotal = (armazon != null ? armazon.precio * ac.cantidad : 0) +
                                          (ac.tipoMica == "LDC"
                                            ? (lente != null ? lente.precio : 0)
                                            : (ac.tipoMica != "SIN"
                                                ? (mica != null ? mica.precio: 0)
                                                : 0))
                        };

            return query.ToList();
        }

        public double ConsultarPrecioTotal(int id)
        {
            //double total = _context.ArticuloCotizacion.Where(a => a.cotizacionid.Equals(id)).Sum(a => a.Armazon.precio * a.cantidad);
            double total = 0;
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
