using Consultorio.Server.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Consultorio.Server.Base.Impl
{
    public class BaseRepository<T> : IBaseRepository<T> where T : class
    {
        protected readonly AppDbContext context;

        public BaseRepository(AppDbContext context)
        {
            this.context = context;
        }
        public T Agregar(T obj)
        {
            context.Add(obj);
            context.SaveChanges();
            return obj;
        }

        public void Editar(T obj)
        {
            context.Update(obj);
            context.SaveChanges();
        }

        public void Eliminar(T obj)
        {
            context.Remove(obj);
            context.SaveChanges();
        }
    }
}
