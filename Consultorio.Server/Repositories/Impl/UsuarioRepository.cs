using Consultorio.Server.Base.Impl;
using Consultorio.Server.DTOs;
using Consultorio.Server.Models;
using Microsoft.EntityFrameworkCore;
using System.Net.NetworkInformation;
using System.Security.Cryptography;
using System.Text;

namespace Consultorio.Server.Repositories.Impl
{
    public class UsuarioRepository(AppDbContext context) : BaseRepository<Usuario>(context), IUsuarioRepository
    {
        private readonly AppDbContext _context = context;


        public IEnumerable<UsuarioDTO> ConsultarDTO()
        {
            IEnumerable<Usuario> query = context.Usuario.ToList();
            return from ta in query
                   select new UsuarioDTO
                   {
                       usuarioid = ta.usuarioid,
                       nombreUsuario = ta.nombreUsuario,
                       nombre = ta.nombre,
                       aPaterno = ta.aPaterno,
                       aMaterno = ta.aMaterno,
                       telefono = ta.telefono,
                       correo = ta.correo
                   };
        }

        public Usuario ConsultarPorId(int id)
        {
            return _context.Usuario.Find(id);
        }

        public bool ExisteNombreUsuario(int id, string nombreUsuario)
        {
            return _context.Usuario.Any(x => x.usuarioid != id && x.nombreUsuario == nombreUsuario);
        }
    }
}
