using Consultorio.Server.Base;
using Consultorio.Server.DTOs;
using Consultorio.Server.Models;

namespace Consultorio.Server.Repositories
{
    public interface IArmazonRepository : IBaseRepository<Armazon>
    {
        IEnumerable<ArmazonDTO> ConsultarDTO();
        bool ExisteModelo(int id,string modelo);
        Armazon ConsultarPorId(int id);
    }
}
