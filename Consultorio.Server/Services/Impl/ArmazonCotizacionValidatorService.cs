using Consultorio.Server.Models;
using Consultorio.Server.Repositories;
using FluentValidation;

namespace Consultorio.Server.Services.Impl
{
    public class ArmazonCotizacionValidatorService:AbstractValidator<ArmazonCotizacion>,IArmazonCotizacionValidatorService
    {
        public ArmazonCotizacionValidatorService(IArmazonCotizacionRepository repository)
        {
            Include(new Art(repository));
        }
    }
    public class Art : AbstractValidator<ArmazonCotizacion>
    {
        private readonly IArmazonCotizacionRepository _repository;

        public Art(IArmazonCotizacionRepository repository)
        {
            _repository = repository;
            RuleFor(a => a.armazonid)
            .Cascade(CascadeMode.Stop)
            .NotEmpty().WithMessage("El id es requerido");
        }
    }
}
