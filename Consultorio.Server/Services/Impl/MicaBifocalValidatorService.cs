using Consultorio.Server.Models;
using Consultorio.Server.Repositories;
using FluentValidation;

namespace Consultorio.Server.Services.Impl
{
    public class MicaBifocalValidatorService:AbstractValidator<micaBifocal>
    {
        public MicaBifocalValidatorService(IMicaBifocalRepository repository) 
        {
            Include(new Mono(repository));
        }

        public class Mono:AbstractValidator<micaBifocal>
        {
            private readonly IMicaBifocalRepository _repository;

            public Mono(IMicaBifocalRepository repository)
            {
                _repository = repository;
                RuleFor(m => m.Marca)
                .Cascade(CascadeMode.Stop)
                .NotEmpty().WithMessage("El tipo es requerido");
            }
        }
    }
}
