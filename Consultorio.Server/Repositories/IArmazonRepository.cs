using Consultorio.Server.Models;

namespace Consultorio.Server.Repositories
{
    public interface IArmazonRepository : IBaseRepository<Armazon>
    { 
        Task<bool> ExistsModelo(string modelo);

        Task<bool> ExistsId(int armazonId);
    }
}
