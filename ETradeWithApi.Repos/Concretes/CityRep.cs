using ETradeWithApi.Core;
using ETradeWithApi.Dal;
using ETradeWithApi.Dto;
using ETradeWithApi.Entity.Concretes;
using ETradeWithApi.Repos.Abstracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETradeWithApi.Repos.Concretes
{
    public class CityRep<T> : BaseRepository<City>, ICityRep where T : class
    {
        public CityRep(TradeContext db) : base(db)
        {
        }

        public List<CitiesDTO> GetCitiesDTO()
        {
            return Set().Select(x => new CitiesDTO { Id = x.Id, Description= x.Description }).ToList();
        }
    }
}
