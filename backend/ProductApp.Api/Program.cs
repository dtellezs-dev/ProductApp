using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:4200") // Your Angular app
              .AllowAnyHeader()
              .AllowAnyMethod();
        // Remove AllowCredentials() unless you're using cookies/auth
    });
});

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Database services
builder.Services.AddDbContext<AppDbContext>(opt =>
    opt.UseSqlite("Data Source=products.db"));

// Application services
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<ProductService>();

var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();

    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "ProductApp API V1");
    });

    // Add developer exception page to see errors
    app.UseDeveloperExceptionPage();
}

// ?? CRITICAL: Correct middleware order
app.UseRouting();           // ? First
app.UseCors();              // ? After Routing, Before Authorization
app.UseAuthorization();     // ? After CORS
app.MapControllers();       // ? Last

Console.WriteLine("? API configured. Starting...");
app.Run();