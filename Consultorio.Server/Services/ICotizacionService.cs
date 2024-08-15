using Consultorio.Server.Base;
using Consultorio.Server.DTOs;

namespace Consultorio.Server.Services
{
    public interface ICotizacionService: IBaseService<CotizacionDTO,CotizacionNewDTO>
    {
        CotizacionDTO EliminarDTO(int id);

        CotizacionDTO ConsultarPorIdConFK(int id);
    }
}
