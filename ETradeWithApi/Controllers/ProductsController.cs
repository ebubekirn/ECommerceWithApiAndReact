using AutoMapper;
using ETradeWithApi.Dal;
using ETradeWithApi.Dto;
using ETradeWithApi.Entity.Concretes;
using ETradeWithApi.Http;
using ETradeWithApi.Uow;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ETradeWithApi.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        IUow _uow;
        ApiResponse _apiResponse;
        private readonly IMapper _mapper;

        public ProductsController(IUow uow, ApiResponse apiResponse, IMapper mapper)
        {
            _uow = uow;
            _apiResponse = apiResponse;
            _mapper = mapper;
        }
        [HttpGet]
        public List<Products> List()
        {
            return _uow._productsRep.List();
        }
        [HttpPost]
        public ApiResponse Create(Products product)
        {
            try
            {
                _uow._productsRep.Add(product);
                _uow.Commit();
                _apiResponse.Error = false;
                _apiResponse.Msg = "Ürün Ekleme Başarılı";
            }
            catch (Exception)
            {
                _apiResponse.Error = true;
                _apiResponse.Msg = "Ürün Ekleme Başarısız";
            }
            return _apiResponse;
        }
        [HttpPut]
        public ApiResponse Update([FromBody] Products product)
        {
            try
            {
                Products selectedProduct = _uow._productsRep.Find(product.Id);
                selectedProduct.ProductName = product.ProductName;
                selectedProduct.BasketDetails = product.BasketDetails;
                selectedProduct.UnitPrice = product.UnitPrice;
                selectedProduct.Unit = product.Unit;
                selectedProduct.Categories = product.Categories;
                selectedProduct.Vat = product.Vat;
                selectedProduct.Description = product.Description;
                selectedProduct.CategoryId = product.CategoryId;
                //var x = _mapper.Map<Products>(selectedProduct);
                if (selectedProduct != null)
                {
                    _uow._productsRep.Update(product);
                    _uow.Commit();
                    _apiResponse.Error = false;
                    _apiResponse.Msg = "Ürün Güncelleme Başarılı";
                }
                else
                {
                    _apiResponse.Msg = "Ürün Bulunamadı";
                }

            }
            catch (Exception)
            {

                _apiResponse.Error = true;
                _apiResponse.Msg = "Ürün Güncelleme Başarısız";
            }
            return _apiResponse;
        }
        [HttpDelete("{id:int}")]
        public ApiResponse Delete(int Id)
        {
            try
            {
                Products selectedProduct = _uow._productsRep.Find(Id);
                if (selectedProduct != null)
                {
                    _uow._productsRep.Delete(Id);
                    _uow.Commit();
                    _apiResponse.Error = false;
                    _apiResponse.Msg = "Ürün Silme Başarılı";
                }
                else
                {
                    _apiResponse.Error = true;
                    _apiResponse.Msg = "Ürün Bulunamadı";
                }

            }
            catch (Exception)
            {
                _apiResponse.Error = true;
                _apiResponse.Msg = "Ürün Silme Başarısız";
            }
            return _apiResponse;
        }

        [HttpGet("{id:int}")]
        public Products GetById(int Id)
        {
            return List().Where(x => x.Id == Id).FirstOrDefault();
        }

        
    }
}
