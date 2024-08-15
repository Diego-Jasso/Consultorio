using Consultorio.Server.Models;
using Consultorio.Server.Repositories;
using FluentValidation;

namespace Consultorio.Server.Services.Impl
{
    public class CotizacionValidatorService: AbstractValidator<Cotizacion>,ICotizacionValidatorService
    {
        public CotizacionValidatorService(ICotizacionRepository repository)
        {
            Include(new Cot(repository));
        }
    }
    public class Cot : AbstractValidator<Cotizacion>
    {
        private readonly ICotizacionRepository _repository;

        public Cot(ICotizacionRepository repository)
        {
            _repository = repository;
            RuleFor(cotizacion => cotizacion.folio)
            .Cascade(CascadeMode.Stop)
            .NotEmpty().WithMessage("El folio es requerido");
        }
    }
}
