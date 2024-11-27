using Consultorio.Server.Models;
using Consultorio.Server.Repositories;
using FluentValidation;

namespace Consultorio.Server.Services.Impl
{
    public class MicaValidatorService:AbstractValidator<Mica>
    {
        public MicaValidatorService(IMicaRepository repository) 
        {
            Include(new Trat(repository));
        }

        public class Trat : AbstractValidator<Mica>
        {
            private readonly IMicaRepository _repository;

            public Trat(IMicaRepository repository)
            {
                _repository = repository;
                RuleFor(m => m.precio)
                .Cascade(CascadeMode.Stop)
                .NotEmpty().WithMessage("El precio es requerido");
            }
        }
    }
}
