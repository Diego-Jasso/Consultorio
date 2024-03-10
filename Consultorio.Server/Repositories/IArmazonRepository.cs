using Consultorio.Server.Models;

namespace Consultorio.Server.Repositories
{
    public interface IArmazonRepository
    { 
        Task<IEnumerable<Armazon>> GetArmazones();

        Task<Armazon?> GetArmazon(int armazonId);

        Task<bool> ExistsModelo(string modelo);

        Task<bool> ExistsId(int armazonId);

        Task<int> AddArmazon(Armazon armazon);

        Task<int> DeleteArmazon(Armazon armazon);

        Task<int> UpdateArmazon(Armazon armazon);
    }
}
