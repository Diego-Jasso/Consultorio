using Consultorio.Server.Base;
using Consultorio.Server.DTOs;

namespace Consultorio.Server.Services
{
    public interface IMicaMonofocalService:IBaseService<micaMonofocalDTO,micaMonofocalNewDTO>
    {
        micaMonofocalDTO EliminarDTO(int id);
    }
}
