using Arpick.DataAccessLayer.Interface;
using Arpick.Model;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
// Import the SQL Server namespace

namespace Arpick.DataAccessLayer.Implementation
{
    public class Auth : IAuth
    {
        public readonly IConfiguration _configuration;
        public readonly SqlConnection _sqlConnection;  // Use SqlConnection for SQL Server

        public Auth(IConfiguration configuration)
        {
            _configuration = configuration;
            _sqlConnection = new SqlConnection(_configuration["ConnectionStrings:Connection"]);  // Adjust for SQL Server
        }

        public async Task<Response> SignIn(SignInRequest request)
        {
            Response response = new Response();
            response.IsSuccess = true;
            response.Message = "Successful";


            try
            {
                if (_sqlConnection.State != System.Data.ConnectionState.Open)
                {
                    await _sqlConnection.OpenAsync();
                }

                string hashedPassword = HashPassword(request.Password);

                string sqlQuery = @"SELECT * FROM ARPICK.dbo.UserTable WHERE Email=@Email AND Password=@Password AND Role=@Role;";

                using (SqlCommand sqlCommand = new SqlCommand(sqlQuery, _sqlConnection))
                {
                    sqlCommand.CommandType = System.Data.CommandType.Text;
                    sqlCommand.CommandTimeout = 180;
                    sqlCommand.Parameters.AddWithValue("@Email", request.Email);
                    sqlCommand.Parameters.AddWithValue("@Password", hashedPassword); // Corrected parameter name
                    sqlCommand.Parameters.AddWithValue("@Role", request.Role);

                    using (DbDataReader dataReader = await sqlCommand.ExecuteReaderAsync())
                    {
                        if (dataReader.HasRows)
                        {
                            await dataReader.ReadAsync();
                            response.Message = "Login Successfully";
                            response.data = new UserLoginInformation();
                            response.data.UserId = dataReader["UserId"] != DBNull.Value ? Convert.ToInt32(dataReader["UserId"]) : 0; // Assuming 0 as default value if DBNull
                            response.data.Email = dataReader["Email"] != DBNull.Value ? Convert.ToString(dataReader["Email"]) : string.Empty;
                            response.data.Role = dataReader["Role"] != DBNull.Value ? Convert.ToString(dataReader["Role"]) : string.Empty;
                            response.Token = GenerateJWT(response.data.UserId, response.data.Email, response.data.Role);


                        }
                        else
                        {
                            response.IsSuccess = false;
                            response.Message = "Login Unsuccessfully";
                            return response;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }
            finally
            {
                // Close the connection in the finally block to ensure it is always closed
                _sqlConnection.Close();
            }

            return response;
        }


        public async Task<Response> SignUp(SignUpRequest request)
        {
            Response response = new Response();
            response.IsSuccess = true;
            response.Message = "Registered Successfully";

            try
            {
                if (_sqlConnection.State != System.Data.ConnectionState.Open)
                {
                    await _sqlConnection.OpenAsync();
                }

                if (!request.Password.Equals(request.ConfirmPassword))
                {
                    response.IsSuccess = false;
                    response.Message = "Password & Confirm Password not Match";
                    return response;
                }

                // Hash the password
                string hashedPassword = HashPassword(request.Password);

                string sqlQuery = @"INSERT INTO ARPICK.dbo.UserTable(UserName,Email,FullName,Address,Contact, Password, Role) VALUES (@UserName,@Email, @FullName,@Address,@Contact, @Password, @Role)";

                using (SqlCommand sqlCommand = new SqlCommand(sqlQuery, _sqlConnection))
                {
                    sqlCommand.CommandType = System.Data.CommandType.Text;
                    sqlCommand.CommandTimeout = 180;
                    sqlCommand.Parameters.AddWithValue("@UserName", request.UserName);
                    sqlCommand.Parameters.AddWithValue("@Email", request.Email);
                    sqlCommand.Parameters.AddWithValue("@FullName", request.FullName);
                    sqlCommand.Parameters.AddWithValue("@Address", request.Address);
                    sqlCommand.Parameters.AddWithValue("@Contact", request.Contact);
                    sqlCommand.Parameters.AddWithValue("@Password", hashedPassword);
                    sqlCommand.Parameters.AddWithValue("@Role", request.Role);

                    int status = await sqlCommand.ExecuteNonQueryAsync();

                    if (status <= 0)
                    {
                        response.IsSuccess = false;
                        response.Message = "Something Went Wrong";
                        return response;
                    }
                }
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }
            finally
            {
                // Close the connection in the finally block to ensure it is always closed
                _sqlConnection.Close();
            }

            return response;
        }

        // Hashing function using SHA256
        private string HashPassword(string password)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));

                // Convert the byte array to a hexadecimal string
                StringBuilder builder = new StringBuilder();
                for (int i = 0; i < hashedBytes.Length; i++)
                {
                    builder.Append(hashedBytes[i].ToString("x2"));
                }
                return builder.ToString();
            }
        }

        public async Task<Response> ForgotPassword(ForgotPasswordRequest request)
        {
            Response response = new Response();
            response.IsSuccess = true;
            response.Message = "Password reset instructions sent successfully";

            try
            {
                // Validate if the email exists in the database
                if (_sqlConnection.State != System.Data.ConnectionState.Open)
                {
                    await _sqlConnection.OpenAsync();
                }

                // Hash the password
                string hashedPassword = HashPassword(request.ChangePassword);

                string sqlQuery = @"SELECT * FROM ARPICK.dbo.UserTable WHERE Email=@Email;";

                using (SqlCommand sqlCommand = new SqlCommand(sqlQuery, _sqlConnection))
                {
                    sqlCommand.CommandType = System.Data.CommandType.Text;
                    sqlCommand.CommandTimeout = 180;
                    sqlCommand.Parameters.AddWithValue("@Email", request.Email);

                    using (DbDataReader dataReader = await sqlCommand.ExecuteReaderAsync())
                    {
                        if (!dataReader.HasRows)
                        {
                            response.IsSuccess = false;
                            response.Message = "Email not found";
                            return response;
                        }
                    }
                }


                // Update the user's password with the temporary password in the database
                string updateQuery = @"UPDATE ARPICK.dbo.UserTable SET Password = @ChangePassword WHERE Email = @Email;";

                using (SqlCommand updateCommand = new SqlCommand(updateQuery, _sqlConnection))
                {
                    updateCommand.CommandType = System.Data.CommandType.Text;
                    updateCommand.CommandTimeout = 180;
                    updateCommand.Parameters.AddWithValue("@ChangePassword", hashedPassword);
                    updateCommand.Parameters.AddWithValue("@Email", request.Email);

                    await updateCommand.ExecuteNonQueryAsync();
                }

                // Send the temporary password to the user via email or any other communication method

            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }
            finally
            {
                _sqlConnection.Close();
            }

            return response;
        }

        public string GenerateJWT(int UserId, string Email, string Role)
        {

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            //claim is used to add identity to JWT token
            var claims = new[] {
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(JwtRegisteredClaimNames.Sid, UserId.ToString()), // Convert UserId to string
            new Claim(JwtRegisteredClaimNames.Email, Email),
            new Claim(ClaimTypes.Role, Role),
            new Claim("Date", DateTime.Now.ToString()),
        };

            var token = new JwtSecurityToken(_configuration["Jwt:Issuer"],
                _configuration["Jwt:Audiance"],
                claims,    //null original value
                expires: DateTime.Now.AddMinutes(120),

                //notBefore:
                signingCredentials: credentials);

            string Data = new JwtSecurityTokenHandler().WriteToken(token); //return access token 
            return Data;
        }


        public async Task<UserModel> GetUserDetails(int userId)
        {
            UserModel userDetails = null;

            try
            {
                if (_sqlConnection.State != System.Data.ConnectionState.Open)
                {
                    await _sqlConnection.OpenAsync();
                }

                string sqlQuery = @"SELECT * FROM ARPICK.dbo.UserTable WHERE UserId=@UserId;";

                using (SqlCommand sqlCommand = new SqlCommand(sqlQuery, _sqlConnection))
                {
                    sqlCommand.CommandType = System.Data.CommandType.Text;
                    sqlCommand.CommandTimeout = 180;
                    sqlCommand.Parameters.AddWithValue("@UserId", userId);

                    using (DbDataReader dataReader = await sqlCommand.ExecuteReaderAsync())
                    {
                        if (dataReader.HasRows)
                        {
                            await dataReader.ReadAsync();
                            userDetails = new UserModel
                            {
                                UserId = dataReader["UserId"] != DBNull.Value ? Convert.ToInt32(dataReader["UserId"]) : 0,
                                UserName = dataReader["UserName"] != DBNull.Value ? Convert.ToString(dataReader["UserName"]) : string.Empty,
                                Email = dataReader["Email"] != DBNull.Value ? Convert.ToString(dataReader["Email"]) : string.Empty,
                                FullName = dataReader["FullName"] != DBNull.Value ? Convert.ToString(dataReader["FullName"]) : string.Empty,
                                Address = dataReader["Address"] != DBNull.Value ? Convert.ToString(dataReader["Address"]) : string.Empty,
                                Contact = dataReader["Contact"] != DBNull.Value ? Convert.ToString(dataReader["Contact"]) : string.Empty,
                            };
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                // Handle exceptions
            }
            finally
            {
                _sqlConnection.Close();
            }

            return userDetails;
        }
        public async Task<bool> UpdateUserDetails(UserModel user)
        {
            try
            {
                if (_sqlConnection.State != System.Data.ConnectionState.Open)
                {
                    await _sqlConnection.OpenAsync();
                }

                string sqlQuery = @"
                                    UPDATE ARPICK.dbo.UserTable 
                                    SET UserName = @UserName, 
                                    Email = @Email, 
                                    FullName = @FullName, 
                                    Address = @Address, 
                                    Contact = @Contact 
                                    WHERE UserId = @UserId;";

                using (SqlCommand sqlCommand = new SqlCommand(sqlQuery, _sqlConnection))
                {
                    sqlCommand.CommandType = System.Data.CommandType.Text;
                    sqlCommand.CommandTimeout = 180;
                    sqlCommand.Parameters.AddWithValue("@UserName", user.UserName);
                    sqlCommand.Parameters.AddWithValue("@Email", user.Email);
                    sqlCommand.Parameters.AddWithValue("@FullName", user.FullName);
                    sqlCommand.Parameters.AddWithValue("@Address", user.Address);
                    sqlCommand.Parameters.AddWithValue("@Contact", user.Contact);
                    sqlCommand.Parameters.AddWithValue("@UserId", user.UserId);

                    int rowsAffected = await sqlCommand.ExecuteNonQueryAsync();

                    return rowsAffected > 0;
                }
            }
            catch (Exception ex)
            {
                // Handle exceptions
                return false;
            }
            finally
            {
                _sqlConnection.Close();
            }
        }



    }
}
