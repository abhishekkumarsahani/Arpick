namespace Arpick.Model
{
    public class SignUpRequest
    {
        ////UserName, PassWord, Role
        //public string UserName { get; set; }
        //public string Password { get; set; }
        //public string ConfigPassword { get; set; }
        //public string Role { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public string Email { get; set; }
        public string FullName { get; set; }
        public string Address { get; set; }
        public string Contact { get; set; }
        public string Role { get; set; }
    }
}
