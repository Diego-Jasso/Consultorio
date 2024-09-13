using Consultorio.Server.Base.Impl;
using Consultorio.Server.DTOs;
using Consultorio.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace Consultorio.Server.Controllers
{
    public class TratamientosServiciosController(ITratamientosServiciosService service):BaseApiController
    {
        [HttpGet]
        public ActionResult<List<tratamientosServiciosDTO>> ConsultarDTO()
        {
            return service.ConsultarDTO();
        }

        [HttpGet("{id}")]

        public ActionResult<tratamientosServiciosDTO> ConsultarPorId(int id)
        {
            return service.ConsultarPorId(id);
        }

        [HttpPost]
        public ActionResult<tratamientosServiciosDTO> Agregar(tratamientosServiciosNewDTO dto)
        {
            var result = service.Agregar(dto);
            if (result.Success)
                return Ok();
            else
                return BadRequest(result.Error);
        }

        [HttpPut("{id}")]
        public ActionResult<tratamientosServiciosDTO> Editar(tratamientosServiciosDTO dto)
        {
            var result = service.Editar(dto);
            if (result.Success)
                return Ok();
            else
                return BadRequest(result.Error);
        }

        [HttpDelete("{id}")]
        public ActionResult<tratamientosServiciosDTO> Delete(int id)
        {
            var result = service.EliminarDTO(id);
            if (result.Success)
                return NoContent();
            else
                return BadRequest(result.Error);
        }
    }
}
