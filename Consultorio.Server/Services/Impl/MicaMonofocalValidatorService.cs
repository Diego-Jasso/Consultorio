using Consultorio.Server.Models;
using Consultorio.Server.Repositories;
using FluentValidation;

namespace Consultorio.Server.Services.Impl
{
    public class MicaMonofocalValidatorService:AbstractValidator<micaMonofocal>
    {
        public MicaMonofocalValidatorService(IMicaMonofocalRepository repository) 
        {
            Include(new Mono(repository));
        }

        public class Mono:AbstractValidator<micaMonofocal>
        {
            private readonly IMicaMonofocalRepository _repository;

            public Mono(IMicaMonofocalRepository repository)
            {
                _repository = repository;
                RuleFor(m => m.Tipo)
                .Cascade(CascadeMode.Stop)
                .NotEqual("Tipo").WithMessage("El tipo es requerido");
            }
        }
    }
}
