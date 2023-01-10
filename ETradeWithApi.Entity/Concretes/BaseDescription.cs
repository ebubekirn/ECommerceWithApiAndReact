using ETradeWithApi.Entity.Abstracts;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETradeWithApi.Entity.Concretes
{
    public class BaseDescription : IBaseDescription, IBaseTable
    {
        [Key]
        public int Id { get; set; }
        public string ?Description { get; set; }
    }
}
