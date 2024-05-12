using AutoMapper;
using Consultorio.Server.DTOs;
using Consultorio.Server.Models;

namespace Consultorio.Server.Mapper
{
    public class MapperCode : Profile
    {
        public MapperCode() 
        {
            CreateMap<ArmazonDTO,Armazon>();
            CreateMap<MicaDTO, Mica>();
        }
    }
}
