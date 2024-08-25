using Consultorio.Server.Base.Impl;
using Consultorio.Server.DTOs;
using Consultorio.Server.Models;

namespace Consultorio.Server.Repositories.Impl
{
    public class MicaProgresivoRepository(AppDbContext context) : BaseRepository<micaProgresivo>(context),IMicaProgesivoRepository
    {
        private readonly AppDbContext _context = context;


        public IEnumerable<micaProgresivoDTO> ConsultarDTO()
        {
            IEnumerable<micaProgresivo> query = context.MicaProgresivo.ToList();
            return from m in query
                   select new micaProgresivoDTO
                   {
                       Id = m.Id,
                       Material = m.Material,
                       AutographIntelligenge2 = m.AutographIntelligenge2,
                       AautographIID = m.AautographIID,
                       IntouchUX = m.IntouchUX,
                       hdExperience = m.hdExperience
                   };
        }

        public micaProgresivo ConsultarPorId(int id)
        {
            return _context.MicaProgresivo.Find(id);
        }
    }
}
