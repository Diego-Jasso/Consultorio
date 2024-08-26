using Consultorio.Server.Models;
using Consultorio.Server.Repositories;
using FluentValidation;

namespace Consultorio.Server.Services.Impl
{
    public class LenteDeContactoValidatorService:AbstractValidator<lenteDeContacto>
    {
            public LenteDeContactoValidatorService(ILenteDeContactoRepository repository)
            {
                Include(new contacto(repository));
            }
        }
        public class contacto : AbstractValidator<lenteDeContacto>
        {
            private readonly ILenteDeContactoRepository _repository;

            public contacto(ILenteDeContactoRepository repository)
            {
                _repository = repository;
                RuleFor(l => l.Tipo)
                .Cascade(CascadeMode.Stop)
                .NotEqual("Tipo").WithMessage("El tipo es requerido");
            }
        }
}
