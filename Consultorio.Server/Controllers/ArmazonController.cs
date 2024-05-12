using Consultorio.Server.Services;
using Microsoft.AspNetCore.Mvc;
using Consultorio.Server.Models;
using System.Timers;
using AutoMapper;
using Consultorio.Server.DTOs;

namespace Consultorio.Server.Controllers
{
    public class ArmazonController(IArmazonService service,IMapper mapper) : BaseApiController
    {
        private readonly IArmazonService _service = service;
        private readonly IMapper _mapper = mapper;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Armazon>>> GetAll()
        {
            return Ok(await _service.GetAll());
        }

        [HttpGet]
        [Route("ExistsModelo")]

        public async Task<ActionResult<Armazon>> ExistsModelo(string modelo)
        {
            if (await _service.ExistsModelo(modelo))
            {
                return Ok("El modelo de armazon existe");
            }
            else
            {
                return BadRequest("El modelo de armazon no existe");
            }

        }

        [HttpGet]
        [Route("ExistsId")]

        public async Task<ActionResult<Armazon>> ExistsId(int armazonid)
        {
            if (await _service.ExistsId(armazonid))
            {
                return Ok("El armazon existe");
            }
            else
            {
                return BadRequest("El armazon no existe");
            }
        }

        [HttpGet("{armazonid}")]

        public async Task<ActionResult<Armazon>> GetById(int armazonid)
        {
            var armazon = await _service.GetById(armazonid);
            if (armazon == null) return BadRequest();
            return armazon;
        }

        [HttpPost]
        public async Task<ActionResult<ArmazonDTO>> Add(ArmazonDTO armazonDTO)
        {
            var armazon = _mapper.Map<Armazon>(armazonDTO);
            if (await _service.ExistsModelo(armazon.modelo))
            {
                return BadRequest("El modelo de armazon ya existe");
            }
            else
            {
                await _service.Add(armazon);
                return Ok(armazon);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Armazon>> Update(int id,Armazon armazon)
        {
            if(armazon.armazonid != id)
            {
                return BadRequest();
            }

            await _service.Update(armazon);
            return NoContent();
        }

        [HttpDelete("{armazonId}")]
        public async Task<ActionResult<Armazon>> Delete(int armazonId)
        {
            var armazon = await _service.GetById(armazonId);
            if (armazon == null) return BadRequest();
            await _service.Delete(armazon);
            return NoContent();
        }
    }
}
