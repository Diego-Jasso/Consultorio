using Consultorio.Server.Models;

namespace Consultorio.Server.Services
{
    public interface IArmazonService
    {
        Task<IEnumerable<Armazon>> GetArmazones();

        Task<bool> Exists(string modelo);

        Task<Armazon> AddArmazon(Armazon armazon);
    }
}
