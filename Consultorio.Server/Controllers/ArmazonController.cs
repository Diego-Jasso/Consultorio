using Consultorio.Server.Services;
using Microsoft.AspNetCore.Mvc;
using Consultorio.Server.Models;
using System.Timers;
using AutoMapper;
using Consultorio.Server.DTOs;
using Consultorio.Server.Base.Impl;

namespace Consultorio.Server.Controllers
{
    public class ArmazonController(IArmazonService service) : BaseApiController
    {
        [HttpGet]
        public ActionResult<List<ArmazonDTO>> ConsultarDTO()
        {
            return service.ConsultarDTO();
        }

        [HttpGet("{id}")]

        public ActionResult<ArmazonDTO> ConsultarPorId(int id)
        {
            return service.ConsultarPorId(id);
        }

        [HttpPost]
        public ActionResult<ArmazonDTO> Agregar(ArmazonNewDTO dto)
        {
            var result = service.Agregar(dto);
            if (result.Success)
                return Ok();
            else
                return BadRequest(result.Error);
        }

        [HttpPut("{id}")]
        public ActionResult<ArmazonDTO> Editar(ArmazonDTO dto)
        {
            var result = service.Editar(dto);
            if (result.Success)
                return Ok();
            else
                return BadRequest(result.Error);
        }

        [HttpDelete("{id}")]
        public ActionResult<ArmazonDTO> Delete(int id)
        {
            var result = service.EliminarDTO(id);
            if (result.Success)
                return NoContent();
            else
                return BadRequest(result.Error);
        }
    }
}
