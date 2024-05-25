using Consultorio.Server.Base.Impl;
using Consultorio.Server.DTOs;
using Consultorio.Server.Models;
using Consultorio.Server.Services;
using Consultorio.Server.Services.Impl;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Http.Headers;

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
            var usuario = _service.ConsultarPorUsuario(login.usname);
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
                id = usuario.usuarioid,
                usname = usuario.nombreUsuario,
                token = _tokenService.CrearToken(usuario)
            };

            return Ok(usuarioDto);
        }
        [HttpGet]
        public ActionResult<AuthResponseDTO> Renovar()
        {
            string? token = Request.Headers["TokenKey"];

            if(string.IsNullOrWhiteSpace(token))
            {
                return new AuthResponseDTO
                {
                    status = "error",
                    message = "No se pudo renovar su token",
                    ok = false
                };
            }

            var tokenHandler = new JwtSecurityTokenHandler();

            var jwtToken = tokenHandler.ReadJwtToken(token);

            int id = Convert.ToInt32(jwtToken.Claims.FirstOrDefault(claim => claim.Type == JwtRegisteredClaimNames.Sub)?.Value);
            string? nombreUsuario = jwtToken.Claims.FirstOrDefault(claim => claim.Type == JwtRegisteredClaimNames.NameId)?.Value;

            if (nombreUsuario == null)
            {
                return new AuthResponseDTO 
                { status = "error", 
                    message = "No se pudo renovar su token", 
                    ok = false 
                };
            }

            UsuarioDTO? usuario = _service.ConsultarPorId(id);

            if(usuario == null)
            {
                return new AuthResponseDTO
                {
                    status = "error",
                    message = "No se pudo renovar su token",
                    ok = false
                };
            }

            return new AuthResponseTrueDTO
            {
                status = "success",
                message = "log in success",
                ok = true,
                id = usuario.usuarioid,
                usname = nombreUsuario,
                token = _tokenService.CrearToken(usuario)
            };
        }
        [HttpPost("new")]
        public ActionResult<AuthResponseDTO> Registro(UsuarioNewDTO dto)
        {
            var result = _service.Agregar(dto);
            if (result.Success)
            {
                return new AuthResponseTrueDTO
                {
                    status = "success",
                    message = "log in success",
                    ok = true,
                    id = result.usuarioid,
                    usname = result.nombreUsuario,
                    token = _tokenService.CrearToken(result)
                };
            }
            else
            {
                return new AuthResponseDTO
                {
                    status = "error",
                    message = result.Error,
                    ok = false
                };
            }
        }
                
    }
}
