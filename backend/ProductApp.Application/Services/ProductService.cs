public class ProductService
{
    private readonly IProductRepository _repo;
    public ProductService(IProductRepository repo) => _repo = repo;

    public Task<List<Product>> GetAll() => _repo.GetAllAsync();

    public async Task<Product?> GetById(int id)
    {
        return await _repo.GetByIdAsync(id);
    }

    public async Task Add(string name, decimal price, int stock)
    {
        var product = new Product { Name = name, Price = price, Stock = stock };
        await _repo.AddAsync(product);
        await _repo.SaveAsync();
    }

    public async Task<bool> Update(int id, string name, decimal price, int stock)
    {
        var product = await _repo.GetByIdAsync(id);
        if (product == null)
            return false;

        product.Name = name;
        product.Price = price;
        product.Stock = stock;

        await _repo.UpdateAsync(product);
        await _repo.SaveAsync();
        return true;
    }
}