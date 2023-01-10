
using ETradeWithApi.Uow;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ETradeWithApi.Entity.Concretes;
using Newtonsoft.Json;
using ETradeWithApi.Http;
using ETradeWithApi.Dto;

namespace ETradeWithApi.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        IUow _uow;
        ApiResponse _apiResponse;

        public AuthController(IUow uow, ApiResponse apiResponse)
        {
            _uow = uow;
            _apiResponse = apiResponse;
        }


        [HttpPost]

        public ApiResponse Register(Users user)
        {

            var newUser = _uow._usersRep.CreateUser(user);
            if (newUser.Error == true)
            {
                _apiResponse.Error = true;
                _apiResponse.Msg = $"{newUser.EntityName} mevcut";

            }
            else
            {
                newUser.Role = "User";
                _uow._usersRep.Add(newUser);
                _uow.Commit();

                _apiResponse.Error = false;
                _apiResponse.Msg = $"{newUser.EntityName} yaratıldı";
            }
            return _apiResponse;

        }


        [HttpPost]
        public ApiResponse Login(string Mail, string Password)
        {
            var user = _uow._usersRep.Login(Mail, Password);
            if (user.Error == false)
            {
                //HttpContext.Session.SetString("User", JsonConvert.SerializeObject(user));
                _apiResponse.Error = false;
                _apiResponse.Msg = $"{Mail} ile giriş yapıldı";

            }
            else
            {
                _apiResponse.Error = true;
                _apiResponse.Msg = "Kullanıcı adı veya şifre hatalı";
            }
            return _apiResponse;
        }

        [HttpGet]
        public List<Users> GetUsers()
        {
            return _uow._usersRep.List();
        }

        [HttpGet("{id:int}")]
        public List<CountiesDTO> GetCountyName(int id)
        {
            return _uow._countyRep.GetCountyDTO(id);
        }
        [HttpGet]
        public List<CitiesDTO> GetCityName()
        {
            return _uow._cityRep.GetCitiesDTO();
        }
    }
}
