using FluentValidation;
using Consultorio.Server.Models;
using Consultorio.Server.Repositories;

namespace Consultorio.Server.Services.Impl
{
    public class MicaValidatorService:AbstractValidator<Mica>,IMicaValidatorService
    {
        public MicaValidatorService() { }
    }
}
