using Consultorio.Server.Models;

namespace Consultorio.Server.Services
{
    public interface IArmazonService : IBaseService<Armazon>
    {
        Task<bool> ExistsModelo(string modelo);

        Task<bool> ExistsId(int armazonId);
    }
}
