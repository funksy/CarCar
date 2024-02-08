from django.shortcuts import render
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

    def get_extra_data(self, o):
        return {
            "date": o.date_time.strftime("%-m/%-d/%Y"),
            "time": o.date_time.strftime("%I:%M %p"),
            "is_vip": (
                "Yes"
                if AutomobileVO.objects.filter(vin=o.vin).count()
                else "No"
            ),
        }


# Create your views here.
@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    if request.method == "GET":
        try:
            appointments = Appointment.objects.all()
            return JsonResponse(
                appointments, encoder=AppointmentEncoder, safe=False
            )
        except:
            return JsonResponse(
                {"message": "Failed to get appointments!"}, status=400
            )
    if request.method == "POST":
        content = json.loads(request.body)
        if "technician" in content:
            try:
                technician_id = content["technician"]
                content["technician"] = Technician.objects.get(
                    id=technician_id
                )
            except Technician.DoesNotExist:
                return JsonResponse(
                    {"message": "Technician dose not exist!"}, status=404
                )
        try:
            appt = Appointment.objects.create(**content)
            appointment = Appointment.objects.get(id=appt.id)

            return JsonResponse(
                appointment, encoder=AppointmentEncoder, safe=False
            )
        except:
            return JsonResponse(
                {"message": "Failed to create an appointment!"}, status=400
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
            return JsonResponse(
                {"message": "Appointment dose not exist!"}, status=404
            )
        except:
            return JsonResponse(
                {"message": "Failed to get appointment!"}, status=400
            )
    if request.method == "PUT":
        try:
            appointment = Appointment.objects.get(id=id)
        except Appointment.DoesNotExist:
            return JsonResponse(
                {"message": "Appointment dose not exist!"}, status=404
            )

        content = json.loads(request.body)

        if "technician" in content:
            try:
                technician_id = content["technician"]
                content["technician"] = Technician.objects.get(
                    id=technician_id
                )
            except Technician.DoesNotExist:
                return JsonResponse(
                    {"message": "Technician dose not exist!"}, status=400
                )
        try:
            for key, values in content.items():
                setattr(appointment, key, values)
            appointment.save()
            appointment = Appointment.objects.get(id=id)
            return JsonResponse(
                appointment, encoder=AppointmentEncoder, safe=False
            )
        except:
            return JsonResponse(
                {"message": "Failed to update the appointment!"}, status=400
            )

    if request.method == "DELETE":
        count, _ = Appointment.objects.filter(id=id).delete()
        if count == 0:
            return JsonResponse(
                {"message": "Appointment dose not exist!"}, status=404
            )
        else:
            return JsonResponse({"deleted": True})


@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        try:
            technicians = Technician.objects.all()
            return JsonResponse(
                technicians, encoder=TechnicianEncoder, safe=False
            )
        except:
            return JsonResponse(
                {"message": "Failed to get technicians!"}, status=400
            )
    if request.method == "POST":
        try:
            content = json.loads(request.body)
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician, encoder=TechnicianEncoder, safe=False
            )
        except:
            return JsonResponse(
                {"message": "Failed to add technician!"}, status=400
            )


@require_http_methods(["GET", "PUT", "DELETE"])
def api_show_technician(request, id):
    if request.method == "GET":
        try:
            technician = Technician.objects.get(id=id)
            return JsonResponse(
                technician, encoder=TechnicianEncoder, safe=False
            )
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Technician dose not exist!"}, status=404
            )
        except:
            return JsonResponse(
                {"message": "Failed to get technician!"}, status=400
            )
    if request.method == "PUT":
        content = json.loads(request.body)
        try:
            technician = Technician.objects.get(id=id)
            for key, values in content.items():
                setattr(technician, key, values)
            technician.save()
            technician = Technician.objects.get(id=id)
            return JsonResponse(
                technician, encoder=TechnicianEncoder, safe=False
            )
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Technician dose not exist!"}, status=404
            )
        except:
            return JsonResponse(
                {"message": "Failed to update technician!"}, status=400
            )
    if request.method == "DELETE":
        count, _ = Technician.objects.filter(id=id).delete()
        if count == 0:
            return JsonResponse(
                {"message": "Technician dose not exist!"}, status=404
            )
        else:
            return JsonResponse({"deleted": True})
