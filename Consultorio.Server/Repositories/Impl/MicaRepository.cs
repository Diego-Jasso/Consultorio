using Consultorio.Server.Base.Impl;
using Consultorio.Server.DTOs;
using Consultorio.Server.Models;

namespace Consultorio.Server.Repositories.Impl
{
    public class MicaRepository(AppDbContext context) : BaseRepository<Mica>(context),IMicaRepository
    {
        private readonly AppDbContext _context = context;


        public IEnumerable<MicaDTO> ConsultarDTO()
        {
            IEnumerable<Mica> query = context.Mica.ToList();
            return from m in query
                   select new MicaDTO
                   {
                       Id = m.Id,
                       tipoMica = m.tipoMica,
                       marca = m.marca,
                       descripcion = m.descripcion,
                       materialTratamiento = m.materialTratamiento,
                       esfera = m.esfera,
                       cilindro = m.cilindro,
                       adiciones = m.adiciones,
                       resumen = ((m.descripcion.Trim() == string.Empty ? "": $"{m.descripcion.Trim()} ") + (m.esfera == string.Empty ? "" : $"ESFERA {m.esfera} ") + (m.cilindro == string.Empty ? "" : $"CILINDRO {m.cilindro} ") + (m.adiciones == string.Empty ? "" : $"ADICIONES {m.adiciones} ")),
                       precio = m.precio
                   };
        }

        public IEnumerable<MicaDTO> ConsultarDTOConFiltro(string filtro)
        {
            IEnumerable<Mica> query = context.Mica.Where(m => m.tipoMica.Equals(filtro) || filtro == "ALL").ToList();
            return from m in query
                   select new MicaDTO
                   {
                       Id = m.Id,
                       tipoMica = m.tipoMica,
                       marca = m.marca,
                       descripcion = m.descripcion,
                       materialTratamiento = m.materialTratamiento,
                       esfera = m.esfera,
                       cilindro = m.cilindro,
                       adiciones = m.adiciones,
                       resumen = ((m.descripcion.Trim() == string.Empty ? "" : $"{m.descripcion.Trim()} ") + (m.esfera == string.Empty ? "" : $"ESFERA {m.esfera} ") + (m.cilindro == string.Empty ? "" : $"CILINDRO {m.cilindro} ") + (m.adiciones == string.Empty ? "" : $"ADICIONES {m.adiciones} ")),
                       precio = m.precio
                   };
        }

        public Mica ConsultarPorId(int id)
        {
            return _context.Mica.Find(id);
        }
    }
}
