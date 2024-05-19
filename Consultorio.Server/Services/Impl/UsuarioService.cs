using AutoMapper;
using Consultorio.Server.Base;
using FluentValidation.Results;
using Consultorio.Server.DTOs;
using Consultorio.Server.Models;
using Consultorio.Server.Repositories;
using Consultorio.Server.Repositories.Impl;
using System.Security.Cryptography;
using System.Text;
using Consultorio.Server.Utilerias;

namespace Consultorio.Server.Services.Impl
{
    public class UsuarioService(IUsuarioRepository repository,IMapper mapper) : IUsuarioService
    {
        private readonly IUsuarioRepository _repository = repository;
        private readonly IMapper _mapper = mapper;

        public List<UsuarioDTO> ConsultarDTO()
        {
            return _repository.ConsultarDTO().ToList();
        }

        public UsuarioDTO ConsultarPorId(int id)
        {
            Usuario usuario = _repository.ConsultarPorId(id);
            return _mapper.Map<UsuarioDTO>(usuario);
        }

        public UsuarioDTO Agregar(UsuarioNewDTO usuarioDto)
        {
            Usuario usuario = _mapper.Map<Usuario>(usuarioDto);
            ConvertirPass(usuario, usuarioDto.password);
            UsuarioValidatorService validator = new(_repository);
            ValidationResult result = validator.Validate(usuario);
            if (result.IsValid)
            {
                _repository.Agregar(usuario);
                return _mapper.Map<UsuarioDTO>(usuario);
            }
            else
            {
                return UsuarioDTO.ToError(
                    result.ToString(Constantes.COMA));
            }             
        }

        public UsuarioDTO Editar(UsuarioDTO usuarioDto)
        {
            Usuario usuario = _mapper.Map<Usuario>(usuarioDto);
            UsuarioValidatorService validator = new(_repository);
            ValidationResult result = validator.Validate(usuario);
            if (result.IsValid)
            {
                _repository.Editar(usuario);
                return _mapper.Map<UsuarioDTO>(usuario);
            }
            else
            {
                return UsuarioDTO.ToError(
                    result.ToString(Constantes.COMA));
            }
          
        }

        public UsuarioDTO EliminarDTO(int id)
        {
            Usuario usuario = _repository.ConsultarPorId(id);
            UsuarioValidatorService validator = new(_repository);
            ValidationResult result = validator.Validate(usuario);
            if (result.IsValid)
            {
                _repository.Eliminar(usuario);
                return _mapper.Map<UsuarioDTO>(usuario);
            }
            else
            {
                return UsuarioDTO.ToError(
                    result.ToString(Constantes.COMA));
            }
           
        }
    

        public bool LoginExitoso(LoginDTO login)
        {
            bool esExitosoLogin = false;
            
            Usuario usuarioTemp =  _repository.ConsultarPorId(login.id);

            if (usuarioTemp != null){
                using var hmac = new HMACSHA512(usuarioTemp.passwordSalt);
                var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(login.pass));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != usuarioTemp.passwordHasH[i])
                    {
                        esExitosoLogin = false;
                    }
                    else
                    {
                        esExitosoLogin = true;
                    }
                }
            } 
            

            return esExitosoLogin;

        }
        private static void ConvertirPass(Usuario usuario, string pass)
        {
            var password = Password.Convertir(pass);
            usuario.passwordHasH = password.passwordHasH;
            usuario.passwordSalt = password.passwordSalt;
        }

        public int Eliminar(int id)
        {
            throw new NotImplementedException();
        }
    }
}
