using Consultorio.Server.Models;

namespace Consultorio.Server.Repositories
{
    public interface IArmazonRepository
    { 
        Task<IEnumerable<Armazon>> GetArmazones();

        Task<bool> Exists(string modelo);

        Task<Armazon> AddArmazon(Armazon armazon);
    }
}
