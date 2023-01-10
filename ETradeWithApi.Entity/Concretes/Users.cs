using ETradeWithApi.Entity.Abstracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETradeWithApi.Entity.Concretes
{
    public class Users : IBaseEntity
    {
        public string Mail { get; set; }
        public string Password { get; set; }
        public string ?Role { get; set; }
        public bool ?Error { get; set; }
        public int Id { get; set; }
        public string EntityName { get; set; }
        public string ?Street { get; set; }
        public string ?Avenue { get; set; }
        public int No { get; set; }
        public int CountyId { get; set; }
    }
}
