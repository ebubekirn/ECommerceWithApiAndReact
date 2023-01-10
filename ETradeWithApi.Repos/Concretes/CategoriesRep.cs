using ETradeWithApi.Core;
using ETradeWithApi.Dal;
using ETradeWithApi.Dto;
using ETradeWithApi.Entity.Concretes;
using ETradeWithApi.Repos.Abstracts;
using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETradeWithApi.Repos.Concretes
{
    public class CategoriesRep<T> : BaseRepository<Categories>, ICategoriesRep where T : class
    {
        public CategoriesRep(TradeContext db) : base(db)
        {
        }

        public List<CategoriesDTO> GetCategoriesDTO()
        {
            return Set().Select(x => new CategoriesDTO { Id = x.Id, Description = x.Description }).ToList();
        }
    }
}
