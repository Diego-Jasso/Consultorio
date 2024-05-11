using Consultorio.Server.Models;

namespace Consultorio.Server.Repositories
{
    public interface IBaseRepository<T>
    {
        Task<IEnumerable<T>> GetAll();

        Task<T?> GetById(int id);

        Task<int> Add(T obj);

        Task<int> Delete(T obj);

        Task<int> Update(T obj);
    }
}
