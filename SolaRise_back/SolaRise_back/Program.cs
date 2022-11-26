var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(feature =>
                feature.AddPolicy(
                    "CorsPolicy",
                    apiPolicy => apiPolicy
                                    //.AllowAnyOrigin()
                                    //.WithOrigins("http://localhost:4200")
                                    .AllowAnyHeader()
                                    .AllowAnyMethod()
                                    .SetIsOriginAllowed(host => true)
                                    .AllowCredentials()
                                ));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
else
{
    app.UseSwagger();
    //app.UseSwaggerUI();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
        options.RoutePrefix = string.Empty;
    });
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();
app.UseCors("CorsPolicy");

app.UseAuthorization(); 
app.UseEndpoints(endpoints => endpoints.MapControllers());

app.MapRazorPages();

app.Run();
