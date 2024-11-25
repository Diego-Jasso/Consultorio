using Consultorio.Server.Models;
using Consultorio.Server.Repositories;
using FluentValidation;

namespace Consultorio.Server.Services.Impl
{
    public class ArticuloCotizacionValidatorService:AbstractValidator<ArticuloCotizacion>,IArticuloCotizacionValidatorService
    {
        public ArticuloCotizacionValidatorService(IArticuloCotizacionRepository repository)
        {
            Include(new Art(repository));
        }
    }
    public class Art : AbstractValidator<ArticuloCotizacion>
    {
        private readonly IArticuloCotizacionRepository _repository;

        public Art(IArticuloCotizacionRepository repository)
        {
            _repository = repository;
            RuleFor(a => a.armazonid)
            .Cascade(CascadeMode.Stop)
            .NotEmpty().WithMessage("El id es requerido");
        }
    }
}
