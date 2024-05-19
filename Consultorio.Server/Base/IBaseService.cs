namespace Consultorio.Server.Base
{
    public interface IBaseService<T,N> 
    {
        List<T> ConsultarDTO();
        T ConsultarPorId(int id);
        T Agregar(N dto);
        T Editar(T dto);
        int Eliminar(int id);
    }
}
