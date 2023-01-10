using ETradeWithApi.Dal;
using ETradeWithApi.Entity.Concretes;
using ETradeWithApi.Http;
using ETradeWithApi.Models;
using ETradeWithApi.Repos.Abstracts;
using ETradeWithApi.Repos.Concretes;
using ETradeWithApi.Uow;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<TradeContext>(options =>
        options.UseSqlServer(builder.Configuration.GetConnectionString("Baglanti")));

builder.Services.AddAutoMapper(typeof(Program));

builder.Services.AddScoped<IBasketDetailRep, BasketDetailRep<BasketDetail>>();
builder.Services.AddScoped<IBasketMasterRep, BasketMasterRep<BasketMaster>>();
builder.Services.AddScoped<ICategoriesRep, CategoriesRep<Categories>>();
builder.Services.AddScoped<ICityRep, CityRep<City>>();
builder.Services.AddScoped<ICountyRep, CountyRep<County>>();
builder.Services.AddScoped<IProductsRep, ProductsRep<Products>>();
builder.Services.AddScoped<IUnitRep, UnitRep<Unit>>();
builder.Services.AddScoped<IUsersRep, UsersRep<Users>>();
builder.Services.AddScoped<IVatRep, VatRep<Vat>>();
builder.Services.AddScoped<IUow, Uow>();
builder.Services.AddScoped<ApiResponse>();
//builder.Services.AddScoped<BasketDetail>();


builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.AllowAnyOrigin();
                          policy.AllowAnyHeader();
                          policy.AllowAnyMethod();
                      });
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(MyAllowSpecificOrigins);

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
