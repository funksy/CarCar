from django.urls import path

from .views import (
    api_show_automobile_vos,
    api_show_salespeople,
    api_delete_salesperson,
    api_show_customers,
    api_delete_customer,
    api_show_sales,
    api_delete_sale,
)

urlpatterns = [
    path('auto_vos/', api_show_automobile_vos, name='api_show_automobile_vos'),
    path('salespeople/', api_show_salespeople, name='api_show_salespeople'),
    path('salespeople/<int:id>/', api_delete_salesperson, name='api_delete_salesperson'),
    path('customers/', api_show_customers, name='api_show_customers'),
    path('customers/<int:id>/', api_delete_customer, name='api_delete_customer'),
    path('sales/', api_show_sales, name='api_show_sales'),
    path('sales/<int:id>/', api_delete_sale, name='api_delete_sale'),
]
