using Microsoft.EntityFrameworkCore;


public class ProductRepository : IProductRepository
{
    private readonly AppDbContext _ctx;
    public ProductRepository(AppDbContext ctx) => _ctx = ctx;

    public Task<List<Product>> GetAllAsync() =>
        _ctx.Products.ToListAsync();

    public Task<Product?> GetByIdAsync(int id) =>
        _ctx.Products.FindAsync(id).AsTask();

    public async Task AddAsync(Product product)
    {
        await _ctx.Products.AddAsync(product);
    }
    public Task UpdateAsync(Product product)
    {
        _ctx.Products.Update(product);
        return Task.CompletedTask;
    }

    public Task SaveAsync() => _ctx.SaveChangesAsync();
}
