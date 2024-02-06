from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from .models import Salesperson, Customer, Sale, AutomobileVO
from common.json import ModelEncoder


# Create your views here.
class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        'vin',
        'sold',
    ]


class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        'first_name',
        'last_name',
        'employee_id',
        'id',
    ]


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        'first_name',
        'last_name',
        'address',
        'phone_number',
        'id',
    ]


class SaleEncoder(ModelEncoder):
    model = Sale
    properties = [
        'automobile',
        'salesperson',
        'customer',
        'price',
        'id',
    ]

    encoders = {
        'automobile': AutomobileVOEncoder(),
        'salesperson': SalespersonEncoder(),
        'customer': CustomerEncoder(),
    }


@require_http_methods('GET')
def api_show_automobile_vos(request):
    if request.method == 'GET':
        automobiles = AutomobileVO.objects.all()
        return JsonResponse(
            automobiles,
            encoder=AutomobileVOEncoder,
            safe=False,
        )


@require_http_methods(['GET', 'POST'])
def api_show_salespeople(request):
    if request.method == 'GET':
        salespeople = Salesperson.objects.all()
        return JsonResponse(
            salespeople,
            encoder=SalespersonEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        try:
            employee_id = f"{content['first_name'][0]}{content['last_name']}"
            content['employee_id'] = employee_id
            new_salesperson = Salesperson.objects.create(**content)
            return JsonResponse(
                new_salesperson,
                encoder=SalespersonEncoder,
                safe=False,
            )
        except:
            return JsonResponse(
                {'message': 'Your submission contains invalid data'},
                status=400,
            )


@require_http_methods('DELETE')
def api_delete_salesperson(request, id):
    if request.method == 'DELETE':
        count, _ = Salesperson.objects.filter(id=id).delete()
        if count == 0:
            return JsonResponse(
                {'deleted': count > 0},
                status=400,
            )
        else:
            return JsonResponse(
                {'deleted': count > 0}
            )


@require_http_methods(['GET', 'POST'])
def api_show_customers(request):
    if request.method == 'GET':
        customers = Customer.objects.all()
        return JsonResponse(
            customers,
            encoder=CustomerEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        try:
            new_customer = Customer.objects.create(**content)
            return JsonResponse(
                new_customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except:
            return JsonResponse(
                {'message': 'Your submission contains invalid data'},
                status=400,
            )


@require_http_methods('DELETE')
def api_delete_customer(request, id):
    if request.method == 'DELETE':
        count, _ = Customer.objects.filter(id=id).delete()
        if count == 0:
            return JsonResponse(
                {'deleted': count > 0},
                status=400,
            )
        else:
            return JsonResponse(
                {'deleted': count > 0}
            )


@require_http_methods(['GET', 'POST'])
def api_show_sales(request):
    if request.method == 'GET':
        sales = Sale.objects.all()
        return JsonResponse(
            sales,
            encoder=SaleEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        new_sale = {}

        try:
            new_sale['automobile'] = AutomobileVO.objects.get(vin=content['vin'])
            new_sale['salesperson'] = Salesperson.objects.get(id=content['salesperson_id'])
            new_sale['customer'] = Customer.objects.get(id=content['customer_id'])
            new_sale['price'] = content['price']

        except:
            return JsonResponse(
                {'message': 'Your submission contains invalid data'},
                status=400,
            )

        new_sale = Sale.objects.create(**new_sale)

        return JsonResponse(
            new_sale,
            encoder=SaleEncoder,
            safe=False,
        )


@require_http_methods('DELETE')
def api_delete_sale(request, id):
    if request.method == 'DELETE':
        count, _ = Sale.objects.filter(id=id).delete()
        if count == 0:
            return JsonResponse(
                {'deleted': count > 0},
                status=400,
            )
        else:
            return JsonResponse(
                {'deleted': count > 0}
            )
