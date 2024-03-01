using Arpick.Model;

namespace Arpick.DataAccessLayer.Interface
{
    public interface IAuth
    {
        public Task<Response> SignUp(SignUpRequest request);
        public Task<Response> SignIn(SignInRequest request);
        public Task<Response> ForgotPassword(ForgotPasswordRequest request);
    }
}
