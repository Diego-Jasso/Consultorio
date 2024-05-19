using Consultorio.Server.Models;

namespace Consultorio.Server.Base
{
    public interface IBaseRepository<T>
    {
        T Agregar(T obj);

        void Eliminar(T obj);

        void Editar(T obj);
    }
}
