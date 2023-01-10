using ETradeWithApi.Entity.Concretes;
using ETradeWithApi.Http;
using ETradeWithApi.Uow;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ETradeWithApi.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class BasketMasterController : ControllerBase
    {
        IUow _uow;
        ApiResponse _apiresponse;

        public BasketMasterController(IUow uow, ApiResponse apiresponse)
        {
            _uow = uow;
            _apiresponse = apiresponse;
        }
        [HttpPost]
        public ApiResponse Create(int id)
        {
            try
            {
                var incompletedMaster = _uow._basketMasterRep.Set().FirstOrDefault(x => x.Completed == false && x.EntityId ==id);




                if (incompletedMaster != null)
                {
                    _apiresponse.Msg = "mevcut bir sepet var!!";
                }

                else { 
                BasketMaster basket=new BasketMaster();
                    basket.OrderDate=DateTime.Now;
                    basket.EntityId = id;
                    _uow._basketMasterRep.Add(basket);
                    _uow.Commit();
                    _apiresponse.Msg = "yeni sepet eklendi!!";
                    _apiresponse.Error = false;

                }
            }
            catch (Exception)
            {
                _apiresponse.Msg = "Kullanıcı Yok!!";
                _apiresponse.Error = true;


            }

            return _apiresponse;
        }
    }
}
