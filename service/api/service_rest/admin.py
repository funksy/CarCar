from django.contrib import admin
from .models import AutomobileVO

# Register your models here.
@admin.register(AutomobileVO)
class AutomobileVOAdmin(admin.ModelAdmin):
    model = AutomobileVO
    list_display = [
        "id",
        "vin",
        "sold",
    ]
