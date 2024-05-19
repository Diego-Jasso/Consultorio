using Consultorio.Server.Base.Impl;
using Consultorio.Server.DTOs;
using Consultorio.Server.Models;
using Consultorio.Server.Services;
using Consultorio.Server.Services.Impl;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Consultorio.Server.Controllers
{
    public class AuthController(IUsuarioService service,ITokenServices token) :BaseApiController
    {
        private readonly ITokenServices _tokenService = token;
        private readonly IUsuarioService _service = service;

        [AllowAnonymous]
        [HttpPost]
        public ActionResult<AuthResponseDTO> Login(LoginDTO login)
        {
            var usuarioDto = new AuthResponseDTO();
            var usuario = _service.ConsultarPorId(login.id);
            if (usuario == null)
            {
                usuarioDto = new AuthResponseDTO
                {
                    status = "error",
                    message = "El Usuario no existe",
                    ok = false
                };
                return Ok(usuarioDto);
            }
            var resultado = _service.LoginExitoso(login);

            if (!resultado)
            {
                usuarioDto = new AuthResponseDTO
                {
                    status = "error",
                    message = "Contraseña incorrecta",
                    ok = false
                };
                return Ok(usuarioDto);
            }
             usuarioDto = new AuthResponseTrueDTO
            {
                status = "success",
                message = "log in success",
                ok = true,
                id = login.id,
                usname = usuario.nombreUsuario,
                token = _tokenService.CrearToken(usuario)
            };

            return Ok(usuarioDto);
        }

        //[HttpPost("new")]
        //public async Task<ActionResult<Usuario>> Registro(RegistroDTO registro)
        //{
        //    if (await _service.UsuarioExiste(registro.nombreUsuario))
        //    {
        //        return BadRequest("El Nombre de Usuario ya esta registrado");

        //    }

        //    return Ok(await _service.Registro(registro));
        //}
    }
}
