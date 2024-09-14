using Consultorio.Server.Base.Impl;
using Consultorio.Server.DTOs;
using Consultorio.Server.Models;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace Consultorio.Server.Repositories.Impl
{
    public class CotizacionRepository(AppDbContext context): BaseRepository<Cotizacion>(context),ICotizacionRepository
    {
        private readonly AppDbContext _context = context;


        public IEnumerable<CotizacionDTO> ConsultarDTO()
        {
            IEnumerable<Cotizacion> query = context.Cotizacion.Include(c => c.Status).Include(c=> c.Usuario).Include(c=>c.UsuarioMod).ToList();

            return from cot in query
                   select new CotizacionDTO
                   {
                       cotizacionid = cot.cotizacionid,
                       folio = cot.folio,
                       paciente = cot.paciente,
                       fecha_de_creacion = cot.fecha_de_creacion,
                       usuarioid = cot.usuarioid,
                       nombreUsuario = cot.Usuario.nombre,
                       ultimaModificacion = cot.ultimaModificacion,
                       usuarioModificacionid = cot.usuarioModificacionid,
                       nombreModificacionUsuario = cot.UsuarioMod.nombre,
                       precio = cot.precio,
                       statusid = cot.statusid,
                       descripcionStatus = cot.Status.descripcion,
                       anticipo = cot.anticipo
                   };
        }

        public Cotizacion ConsultarPorId(int id)
        {
            return _context.Cotizacion.Find(id);
        }

        public CotizacionDTO ConsultarPorIdConFK(int id)
        {
            Cotizacion? cot = _context.Cotizacion.Include(c => c.Status).Include(c => c.Usuario).Include(c => c.UsuarioMod).Where(c=> c.cotizacionid == id).FirstOrDefault();
            return new CotizacionDTO
                   {
                       cotizacionid = cot.cotizacionid,
                       folio = cot.folio,
                       paciente = cot.paciente,
                       fecha_de_creacion = cot.fecha_de_creacion,
                       usuarioid = cot.usuarioid,
                       nombreUsuario = cot.Usuario.nombre,
                       ultimaModificacion = cot.ultimaModificacion,
                       usuarioModificacionid = cot.usuarioModificacionid,
                       nombreModificacionUsuario = cot.UsuarioMod.nombre,
                       precio = cot.precio,
                       statusid = cot.statusid,
                       descripcionStatus = cot.Status.descripcion
                   };
        }

        public int ConsultarFolio()
        {
            int? maxFolio = _context.Cotizacion.Max(c => (int?)c.folio);

            if (maxFolio.HasValue)
                return maxFolio.Value + 10;
            else
                return 10;
        }
    }
}
