using Consultorio.Server.Models;
using Consultorio.Server.Repositories;
using FluentValidation;

namespace Consultorio.Server.Services.Impl
{
    public class MicaProgresivoValidatorService:AbstractValidator<micaProgresivo>
    {
        public MicaProgresivoValidatorService(IMicaProgresivoRepository repository) 
        {
            Include(new Progre(repository));
        }

        public class Progre : AbstractValidator<micaProgresivo>
        {
            private readonly IMicaProgresivoRepository _repository;

            public Progre(IMicaProgresivoRepository repository)
            {
                _repository = repository;
                RuleFor(m => m.AutographIID)
                .Cascade(CascadeMode.Stop)
                .NotEmpty().WithMessage("El precio es requerido");
            }
        }
    }
}
