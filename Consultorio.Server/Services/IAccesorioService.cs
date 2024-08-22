using Consultorio.Server.Base;
using Consultorio.Server.DTOs;
using Consultorio.Server.Models;

namespace Consultorio.Server.Services
{
    public interface IAccesorioService : IBaseService<AccesorioDTO,AccesorioNewDTO>
    {
        AccesorioDTO EliminarDTO(int id);
    }
}
