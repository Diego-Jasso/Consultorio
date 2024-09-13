using Consultorio.Server.Models;
using Consultorio.Server.Repositories;
using FluentValidation;

namespace Consultorio.Server.Services.Impl
{
    public class TratamientosServiciosValidatorService:AbstractValidator<tratamientosServicios>
    {
        public TratamientosServiciosValidatorService(ITratamientosServiciosRepository repository) 
        {
            Include(new Trat(repository));
        }

        public class Trat : AbstractValidator<tratamientosServicios>
        {
            private readonly ITratamientosServiciosRepository _repository;

            public Trat(ITratamientosServiciosRepository repository)
            {
                _repository = repository;
                RuleFor(m => m.descripcion)
                .Cascade(CascadeMode.Stop)
                .NotEmpty().WithMessage("El precio es requerido");
            }
        }
    }
}
