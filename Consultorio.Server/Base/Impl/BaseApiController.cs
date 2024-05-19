using AutoMapper;
using Consultorio.Server.Models;
using Consultorio.Server.Repositories;
using Consultorio.Server.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Consultorio.Server.Base.Impl
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseApiController : ControllerBase
    {
    }
}
