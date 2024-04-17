using Arpick.Model;

namespace Arpick.DataAccessLayer.Interface
{
    public interface IAuth
    {
        public Task<Response> SignUp(SignUpRequest request);
        public Task<Response> SignIn(SignInRequest request);
        public Task<Response> ForgotPassword(ForgotPasswordRequest request);
        Task<UserModel> GetUserDetails(int userId);
        Task<bool> UpdateUserDetails(UserModel user);
    }
}
