﻿using AutoMapper;
using Consultorio.Server.DTOs;
using Consultorio.Server.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Runtime.CompilerServices;
using System.Security.Claims;
using System.Text;

namespace Consultorio.Server.Services.Impl
{
    public class TokenService : ITokenServices
    {
        private readonly SymmetricSecurityKey _key;
        
        private readonly IMapper _mapper;
        public TokenService(IConfiguration config,IMapper mapper)
        {
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
            _mapper = mapper;

        }
        public string CrearToken(UsuarioDTO dto)
        {
            Usuario usuario = _mapper.Map<Usuario>(dto);
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub,usuario.usuarioid.ToString()),
                new Claim(JwtRegisteredClaimNames.NameId, usuario.nombreUsuario)
            };
            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}
