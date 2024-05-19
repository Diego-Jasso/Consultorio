using Consultorio.Server.Services;
using Consultorio.Server.Services.Impl;
using Microsoft.AspNetCore.Mvc;

namespace Consultorio.Server.Controllers
{
    [ApiController]
    [Route("auth")]
    public class AuthController(ITokenServices token) :BaseApiController
    {
        private readonly ITokenServices _tokenService = token;

        //[HttpPost]
        //public async Task<ActionResult<UsuarioDTO>> Login(LoginDTO login)
        //{
        //    if (!await _service.UsuarioExiste(login.nombreUsuario))
        //        return Unauthorized("El Usuario no existe");

        //    var resultado = _service.UsuarioExisteLogin(login);

        //    if (!resultado.esLoginExitoso)
        //        return Unauthorized("Password no valido");

        //    var usuarioDto = new UsuarioDTO
        //    {
        //        nombreUsuario = resultado.usuario.nombreUsuario,
        //        token = _tokenService.CrearToken(resultado.usuario)
        //    };

        //    return Ok(usuarioDto);
        //}
    }
}
