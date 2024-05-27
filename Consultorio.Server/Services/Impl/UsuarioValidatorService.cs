using Consultorio.Server.DTOs;
using Consultorio.Server.Models;
using Consultorio.Server.Repositories;
using FluentValidation;

namespace Consultorio.Server.Services.Impl
{
    public class UsuarioValidatorService : AbstractValidator<Usuario>, IUsuarioValidatorService
    {
        public UsuarioValidatorService(IUsuarioRepository repository)
        {
            Include(new NombreUsuario(repository));
            Include(new Contra());
        }
    }

    public class NombreUsuario : AbstractValidator<Usuario>
    {
        private readonly IUsuarioRepository _repository;

        public NombreUsuario(IUsuarioRepository repository)
        {
            _repository = repository;
            RuleFor(user => user.nombreUsuario)
               .Cascade(CascadeMode.Stop)
               .NotEmpty().WithMessage("El nombre de usuario es requerido");
            RuleFor(user => user)
                .Must(ValidaNombreRepetido).WithMessage("El nombre de usuario ya existe");
        }

        public bool ValidaNombreRepetido(Usuario usuario)
        {
            return !_repository.ExisteNombreUsuario(usuario.usuarioid, usuario.nombreUsuario);
        }
    }

    public class Contra : AbstractValidator<Usuario>
    {
        public Contra()
        {
            RuleFor(user => user.passwordHasH)
                .Cascade(CascadeMode.Stop)
               .NotEmpty().WithMessage("La contraseña es requerida");
            RuleFor(user => user.passwordSalt)
                .Cascade(CascadeMode.Stop)
               .NotEmpty().WithMessage("La contraseña es requerida");
        }
    }
}
