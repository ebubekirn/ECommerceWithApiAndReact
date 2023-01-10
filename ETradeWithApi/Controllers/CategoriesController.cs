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
    public class CategoriesController : ControllerBase
    {
        IUow _uow;
        ApiResponse _apiResponse;

        public CategoriesController(IUow uow, ApiResponse apiResponse)
        {
            _uow = uow;
            _apiResponse = apiResponse;
        }

        [HttpGet]
        public List<Categories> List()
        {
            return _uow._categoriesRep.List();
        }

        [HttpPost]

        public ApiResponse Create(Categories category)
        {
            try
            {
                _uow._categoriesRep.Add(category);
                _uow.Commit();
                _apiResponse.Error = false;
                _apiResponse.Msg = "Yeni Kategori eklendi";
            }
            catch (Exception)
            {
                _apiResponse.Error = true;
                _apiResponse.Msg = "Kategori ekleme hatası";
            }

            return _apiResponse;
        }

        [HttpPut]
        public ApiResponse Edit(Categories category)
        {
            try
            {
                Categories selectedCategory = _uow._categoriesRep.Find(category.Id);
                selectedCategory.Description = category.Description;
                if (selectedCategory != null)
                {
                    _uow._categoriesRep.Update(category);
                    _uow.Commit();
                    _apiResponse.Error = false;
                    _apiResponse.Msg = "Güncellendi";
                }
                else
                {
                    _apiResponse.Msg = "Ürün Bulunamadı.";
                }

            }
            catch (Exception)
            {
                _apiResponse.Error = true;
                _apiResponse.Msg = "güncelleme hatası";
            }

            return _apiResponse;

        }

        [HttpDelete("{id:int}")]
        public ApiResponse Delete(int id)
        {
            try
            {
                Categories selectedCategory = _uow._categoriesRep.Find(id);
                if (selectedCategory != null)
                {
                    _uow._categoriesRep.Delete(id);
                    _uow.Commit();
                    _apiResponse.Error = false;
                    _apiResponse.Msg = "silindi";
                }
                else
                {
                    _apiResponse.Error = true;
                    _apiResponse.Msg = "Category Bulunamadı";
                }
            }
            catch (Exception)
            {
                _apiResponse.Error = true;
                _apiResponse.Msg = "silme hatası";
            }

            return _apiResponse;

        }
        [HttpGet("{id:int}")]
        public Categories GetById(int Id)
        {
            return List().Where(x => x.Id == Id).FirstOrDefault();
        }

        /*
        public ApiResponse GetCategoryName()
        {
            try
            {
                _uow._categoriesRep.GetCategoriesDTO();
                _apiResponse.Error = false;
                _apiResponse.Msg = "Category Getirme Başarılı.";
            }
            catch (Exception)
            {
                _apiResponse.Error = true;
                _apiResponse.Msg = "Category Getirme hatası Var";
            }
            return _apiResponse;
        }
        */

        [HttpGet]
        public List<CategoriesDTO> GetCategoryName()
        {
            return _uow._categoriesRep.GetCategoriesDTO();
        }

    }
}
