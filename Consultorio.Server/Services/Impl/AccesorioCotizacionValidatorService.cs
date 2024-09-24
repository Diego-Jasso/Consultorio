using Consultorio.Server.Models;
using Consultorio.Server.Repositories;
using FluentValidation;

namespace Consultorio.Server.Services.Impl
{
    public class AccesorioCotizacionValidatorService:AbstractValidator<AccesorioCotizacion>,IAccesorioCotizacionValidatorService
    {
        public AccesorioCotizacionValidatorService(IAccesorioCotizacionRepository repository)
        {
            Include(new Acces(repository));
        }
    }
    public class Acces : AbstractValidator<AccesorioCotizacion>
    {
        private readonly IAccesorioCotizacionRepository _repository;

        public Acces(IAccesorioCotizacionRepository repository)
        {
            _repository = repository;
            RuleFor(a => a.accesorioid)
            .Cascade(CascadeMode.Stop)
            .NotEmpty().WithMessage("El id es requerido");
        }
    }
}
