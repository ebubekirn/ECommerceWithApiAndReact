using ETradeWithApi.Dal;
using ETradeWithApi.Entity.Concretes;
using ETradeWithApi.Http;
using ETradeWithApi.Uow;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ETradeWithApi.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        IUow _uow;
        ApiResponse _apiResponse;
        TradeContext _db;

        public UserController(ApiResponse apiResponse, IUow uow, TradeContext db)
        {
            _apiResponse = apiResponse;
            _uow = uow;
            _db = db;
        }
        [HttpGet]
        public List<Users> UserList()
        {
            return _db.Set<Users>().Where(x=> x.Role=="User").ToList();
        }
        [HttpGet]
        public List<Users> AdminList()
        {
            return _db.Set<Users>().Where(x => x.Role == "Admin").ToList();
        }
        [HttpDelete("{id:int}")]
        public ApiResponse Delete (int id)
        {
            try
            {
                Users selectedUser = _uow._usersRep.Find(id);
                if (selectedUser != null)
                {
                    _uow._usersRep.Delete(id);
                    _uow.Commit();
                    _apiResponse.Error = false;
                    _apiResponse.Msg = "kullanıcı silindi";
                }
                else
                {
                        _apiResponse.Error = true;
                        _apiResponse.Msg = "kullanıcı bulunamadı";
                }
           
            }
            catch (Exception)
            {
                _apiResponse.Error = true;
                _apiResponse.Msg = "kullanıcı silme başarısız";
            }
            return _apiResponse;
        }
        [HttpGet("{id:int}")]
        public Users GetById(int id)
        {
            return UserList().Where(x=> x.Id == id).FirstOrDefault();
        }

    }
}
