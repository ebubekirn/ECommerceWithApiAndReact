using ETradeWithApi.Entity.Concretes;
using ETradeWithApi.Http;
using ETradeWithApi.Uow;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ETradeWithApi.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        IUow _uow;
        ApiResponse _apiResponse;

        public CityController(IUow uow, ApiResponse apiResponse)
        {
            _uow = uow;
            _apiResponse = apiResponse;
        }

        [HttpGet]
        public List<City> List()
        {
            return _uow._cityRep.List();
        }

        [HttpPost]
        public ApiResponse Create(City city)
        {
            try
            {
                _uow._cityRep.Add(city);
                _uow.Commit();
                _apiResponse.Error = false;
                _apiResponse.Msg = "Şehir Eklendi";
            }
            catch (Exception)
            {
                _apiResponse.Error = true;
                _apiResponse.Msg = "Şehir Eklenmedi";
            }

            return _apiResponse;
        }

        [HttpPut]
        public ApiResponse Update(City city)
        {
            try
            {
                _uow._cityRep.Update(city);
                _uow.Commit();
                _apiResponse.Error = false;
                _apiResponse.Msg = "Şehir Güncellendi";
            }
            catch (Exception)
            {
                _apiResponse.Error = true;
                _apiResponse.Msg = "Şehir Güncelleme Başarısız";
            }

            return _apiResponse;
        }
        [HttpDelete] 
        public ApiResponse Delete(City city)
        {
            try
            {
                _uow._cityRep.Delete(city.Id);
                _uow.Commit();
                _apiResponse.Error = false;
                _apiResponse.Msg = "Şehir Silindi";
            }
            catch (Exception)
            {
                _apiResponse.Error = true;
                _apiResponse.Msg = "Şehir Silme İşlemi Başarısız";            
            }
            return _apiResponse;
        }
    }
}
