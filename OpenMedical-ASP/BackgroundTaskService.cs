using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Threading;
using System.Threading.Tasks;

public class BackgroundTaskService : BackgroundService
{
    private readonly IServiceProvider _services;

    public BackgroundTaskService(IServiceProvider services)
    {
        _services = services;
    }
    // Update appointments every 24 hours to make sure we don't have any in the system that are overdue.
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            // Perform the task every 24 hours
            await Task.Delay(TimeSpan.FromHours(24), stoppingToken);

            using (var scope = _services.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<OpenMedicalDBContext>();

                UpdateAppointments(dbContext);
            }
        }
    }

    private void UpdateAppointments(OpenMedicalDBContext dbContext)
    {
        var now = DateTime.UtcNow;
        var appointmentsToUpdate = dbContext.Appointments
            .Where(appointment => appointment.AppointmentStart < now && appointment.Status != "Completed")
            .ToList();

        foreach (var appointment in appointmentsToUpdate)
        {
            appointment.Status = "Missed";
        }

        dbContext.SaveChanges();
    }
}
