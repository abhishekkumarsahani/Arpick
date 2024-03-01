namespace Arpick.Model
{
    public class Response
    {
        public bool IsSuccess { get; set; }
        public string Message { get; set; }
        public string Token { get; set; }
        public UserLoginInformation data { get; set; }
    }
    public class UserLoginInformation
    {
        public int UserId { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
    }
}
