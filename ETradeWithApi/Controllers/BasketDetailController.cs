using ETradeWithApi.Dto;
using ETradeWithApi.Entity.Concretes;
using ETradeWithApi.Http;
using ETradeWithApi.Models;
using ETradeWithApi.Uow;
using Microsoft.AspNetCore.Mvc;

namespace ETradeWithApi.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class BasketDetailController : ControllerBase
    {
        IUow _uow;
        ApiResponse _apiResponse;

        public BasketDetailController(IUow uow, ApiResponse apiResponse)
        {
            _uow = uow;
            _apiResponse = apiResponse;
        }

        [HttpPost]
        public ApiResponse Add(BasketDetailDTO m, int id)
        {
            try
            {
                BasketDetail basket = new BasketDetail();
                Products products = _uow._productsRep.FindWithVat(m.ProductId);
                basket.Amount = m.Amount;
                basket.ProductId = m.ProductId;
                basket.Id = id;
                basket.UnitId = products.UnitId;
                basket.Ratio = products.Vat.Ratio;
                basket.UnitPrice = products.UnitPrice;
                _uow._basketDetailRep.Add(basket);
                _uow.Commit();
                _apiResponse.Error = false;
                _apiResponse.Msg = "Hata Yok";
            }
            catch (Exception)
            {
                _apiResponse.Error = true;
                _apiResponse.Msg = "Hata Var";
            }

            return _apiResponse;
        }

        [HttpDelete("{id:int}/{pid:int}")]
        public ApiResponse Delete(int id, int pid)
        {
            try
            {
                _uow._basketDetailRep.Delete(id, pid);
                _uow.Commit();
                _apiResponse.Error = false;
                _apiResponse.Msg = "Hata Yok.";
            }
            catch (Exception)
            {
                _apiResponse.Error = true;
                _apiResponse.Msg = "Hata Var.";
            }

            return _apiResponse;
        }

        [HttpPut("{id:int}/{pid:int}")]
        public ApiResponse Update(int Amount,int id, int pid)
        {
            try
            {
                var selectedDetail = _uow._basketDetailRep.Find(id, pid);
                selectedDetail.Amount= Amount;
                _uow._basketDetailRep.Update(selectedDetail);
                _uow.Commit();
                _apiResponse.Error = false;
                _apiResponse.Msg = "Hata Yok.";
            }
            catch (Exception)
            {
                _apiResponse.Error = true;
                _apiResponse.Msg = "Hata Var.";
            }

            return _apiResponse;
        }
    }
}
