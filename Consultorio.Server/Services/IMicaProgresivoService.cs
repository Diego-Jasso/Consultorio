using Consultorio.Server.Base;
using Consultorio.Server.DTOs;

namespace Consultorio.Server.Services
{
    public interface IMicaProgresivoService:IBaseService<micaProgresivoDTO,micaProgresivoNewDTO>
    {
        micaProgresivoDTO EliminarDTO(int id);
    }
}
