from django.db import models


# Create your models here.
class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(default=False)

    def __str__(self):
        return self.vin


class Technician(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    employee_id = models.CharField(max_length=200)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Appointment(models.Model):
    date_time = models.DateTimeField(max_length=200)
    reason = models.CharField(max_length=200)
    status = models.CharField(default="scheduled", max_length=200)
    vin = models.CharField(max_length=17)
    customer = models.CharField(max_length=200)
    technician = models.ForeignKey(
        Technician, related_name="appointments", on_delete=models.CASCADE
    )
