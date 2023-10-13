using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore.SqlServer;
using OpenMedical_ASP;
using OpenMedical_ASP.Models; // Replace with the actual namespace of your models
using OpenMedical_ASP.Repositories; // Replace with the actual namespace of your repositories
using Microsoft.EntityFrameworkCore.Query;

namespace OpenMedical_ASP
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            // Configure the database connection using Entity Framework Core
            services.AddDbContext<OpenMedicalDBContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            // Register your repositories or services
            services.AddMvc();
            services.AddMvc(routes =>
            {
                routes.EnableEndpointRouting = false;
            });
            services.AddScoped<IDoctorRepository, DoctorRepository>();
            services.AddScoped<IPatientRepository, PatientRepository>();
            // Add other services as needed

            // Add controllers and enable API versioning if needed
            services.AddControllers();

            // Add CORS policy to allow requests from your React frontend
            services.AddCors(options =>
            {
                options.AddPolicy("AllowReactApp",
                    builder => builder
                        .AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());
            });

            // Configure Swagger/OpenAPI for API documentation
            services.AddSwaggerGen();

            // Add other configurations and services as needed
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();

                // Enable Swagger UI for development
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            else
            {
                // Configure production error handling here
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
            }

            // Enable CORS
            app.UseCors("AllowReactApp");

            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            var connectionString = Configuration.GetConnectionString("DefaultConnection");
            Console.WriteLine($"Connection String: {connectionString}");
        }
    }
}
