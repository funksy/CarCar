from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from .models import AutomobileVO, Technician, Appointment
from common.json import ModelEncoder


class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = ["id", "first_name", "last_name", "employee_id"]

    def get_extra_data(self, o):
        return {"full_name": f"{o.first_name} {o.last_name}"}


class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id",
        "date_time",
        "reason",
        "status",
        "vin",
        "customer",
        "technician",
    ]
    encoders = {"technician": TechnicianEncoder()}


# Create your views here.
@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            appointments, encoder=AppointmentEncoder, safe=False
        )
    if request.method == "POST":
        # Test Data
        # {
        #     "date_time": "2024-03-10T15:35:00Z",
        #     "reason": "Oil Change",
        #     "status": "scheduled ",
        #     "vin": "1C3CC5FB2AN120174",
        #     "customer": "Shawn",
        #     "technician": 1
        # }
        content = json.loads(request.body)
        try:
            technician_id = content["technician"]
            content["technician"] = Technician.objects.get(id=technician_id)

        except Technician.DoesNotExist:
            return JsonResponse({"message": "Technician dose not exist!"})

        appointment = Appointment.objects.create(**content)

        return JsonResponse(
            appointment, encoder=AppointmentEncoder, safe=False
        )


@require_http_methods(["GET", "PUT", "DELETE"])
def api_show_appointment(request, id):
    if request.method == "GET":
        try:
            appointment = Appointment.objects.get(id=id)
            return JsonResponse(
                appointment, encoder=AppointmentEncoder, safe=False
            )
        except Appointment.DoesNotExist:
            return JsonResponse({"message": "Appointment dose not exist!"})
    if request.method == "PUT":
        content = json.loads(request.body)
        try:
            technician_id = content["technician"]
            content["technician"] = Technician.objects.get(id=technician_id)

        except Technician.DoesNotExist:
            return JsonResponse({"message": "Technician dose not exist!"})

        Appointment.objects.update(**content)
        appointment = Appointment.objects.get(id=id)
        return JsonResponse(
            appointment, encoder=AppointmentEncoder, safe=False
        )
    if request.method == "DELETE":
        count, _ = Appointment.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})


@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(technicians, encoder=TechnicianEncoder, safe=False)

    if request.method == "POST":
        # Test Data
        # {
        #   "first_name": "John",
        #   "last_name": "Lukich",
        #   "employee_id": "1001",
        # }
        content = json.loads(request.body)

        technician = Technician.objects.create(**content)

        return JsonResponse(technician, encoder=TechnicianEncoder, safe=False)


@require_http_methods(["GET", "PUT", "DELETE"])
def api_show_technician(request, id):
    if request.method == "GET":
        try:
            technician = Technician.objects.get(id=id)
            return JsonResponse(
                technician, encoder=TechnicianEncoder, safe=False
            )
        except Technician.DoesNotExist:
            return JsonResponse({"message": "Technician dose not exist!"})
    if request.method == "PUT":
        content = json.loads(request.body)
        Technician.objects.update(**content)
        technician = Technician.objects.get(id=id)
        return JsonResponse(technician, encoder=TechnicianEncoder, safe=False)
    if request.method == "DELETE":
        count, _ = Technician.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})
