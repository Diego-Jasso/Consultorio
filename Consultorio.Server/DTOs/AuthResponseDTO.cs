namespace Consultorio.Server.DTOs
{
    public class AuthResponseDTO
    {
        public string status { get; set; } = string.Empty;
        public string message { get; set; } = string.Empty;        
        public bool ok { get; set; } 
    }

    public class AuthResponseTrueDTO : AuthResponseDTO
    {
        public int id { get; set; }
        public string token { get; set; } = string.Empty;
        public string usname { get; set; } = string.Empty;
    }
}
