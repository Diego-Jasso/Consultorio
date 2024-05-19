using System.Security.Cryptography;
using System.Text;

namespace Consultorio.Server.Models
{
    public class Password
    {
        public byte[] passwordHasH { get; set; } = [];
        public byte[] passwordSalt { get; set; } = [];

        public static Password Convertir(string texto)
        {
            var hmac = new HMACSHA512();
            return new Password
            {
                passwordHasH = hmac.ComputeHash(Encoding.UTF8.GetBytes(texto)),
                passwordSalt = hmac.Key
            };
        }
    }
}
