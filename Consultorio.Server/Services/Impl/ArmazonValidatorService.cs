using Consultorio.Server.Models;
using Consultorio.Server.Repositories;
using FluentValidation;

namespace Consultorio.Server.Services.Impl
{
    public class ArmazonValidatorService: AbstractValidator<Armazon>,IArmazonValidatorService
    {
        public ArmazonValidatorService(IArmazonRepository repository) 
        {
            Include(new Modelo(repository));
        }
    }

    public class Modelo : AbstractValidator<Armazon>
    {
        private readonly IArmazonRepository _repository;

        public Modelo(IArmazonRepository repository)
        {
            _repository = repository;
            RuleFor(armazon => armazon.modelo)
            .Cascade(CascadeMode.Stop)
            .NotEmpty().WithMessage("El modelo del armazon es requerido");
            RuleFor(armazon => armazon)
                .Must(ValidaModeloUnico).WithMessage("El modelo del armazon ya existe, asegurese de que sea único");
        }
        public bool ValidaModeloUnico(Armazon armazon)
        {
            return !_repository.ExisteModelo(armazon.modelo);
        }
    }
}
