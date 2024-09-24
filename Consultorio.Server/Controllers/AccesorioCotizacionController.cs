using Consultorio.Server.Base.Impl;
using Consultorio.Server.DTOs;
using Consultorio.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace Consultorio.Server.Controllers
{
    public class AccesorioCotizacionController(IAccesorioCotizacionService service): BaseApiController
    {
        [HttpGet("List/{id}")]
        public ActionResult<List<AccesorioCotizacionDTO>> ConsultarDTO(int id)
        {
            return service.ConsultarDTO(id);
        }

        [HttpGet("{id}")]

        public ActionResult<AccesorioCotizacionDTO> ConsultarPorId(int id)
        {
            return service.ConsultarPorId(id);
        }

        [HttpPost]
        public ActionResult<AccesorioCotizacionDTO> Agregar(AccesorioCotizacionNewDTO dto)
        {
            var result = service.Agregar(dto);
            if (result.Success)
                return Ok();
            else
                return BadRequest(result.Error);
        }

        [HttpPut("{id}")]
        public ActionResult<AccesorioCotizacionDTO> Editar(AccesorioCotizacionDTO dto)
        {
            var result = service.Editar(dto);
            if (result.Success)
                return Ok();
            else
                return BadRequest(result.Error);
        }

        [HttpDelete("{id}")]
        public ActionResult<AccesorioCotizacionDTO> Delete(int id)
        {
            var result = service.EliminarDTO(id);
            if (result.Success)
                return NoContent();
            else
                return BadRequest(result.Error);
        }
    }
}
