using Consultorio.Server.Base.Impl;
using Consultorio.Server.DTOs;
using Consultorio.Server.Models;
using Consultorio.Server.Repositories;
using Consultorio.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace Consultorio.Server.Controllers
{
    public class AccesorioController(IAccesorioService service) : BaseApiController
    {

        [HttpGet]

        public ActionResult<List<AccesorioDTO>> ConsultarDTO()
        {
            return service.ConsultarDTO();
        }

        [HttpGet("{id}")]

        public ActionResult<AccesorioDTO> ConsultarPorId(int id)
        {
            return service.ConsultarPorId(id);
        }

        [HttpPost]

        public ActionResult<AccesorioDTO> Agregar(AccesorioNewDTO dto)
        {
            var result = service.Agregar(dto);
            if (result.Success)
                return Ok();
            else
                return BadRequest(result.Error);
        }

        [HttpPut("{id}")]

        public ActionResult<AccesorioDTO> Editar(AccesorioDTO dto)
        {
            var result = service.Editar(dto);
            if (result.Success)
                return Ok();
            else
                return BadRequest(result.Error);
        }

        [HttpDelete("{id}")]
        public ActionResult<AccesorioDTO> Eliminar(int id)
        {
            var result = service.EliminarDTO(id);
            if (result.Success)
                return NoContent();
            else
                return BadRequest(result.Error);
        }
    }
}
