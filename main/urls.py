from django.urls import path
from . import views

app_name = 'main'

urlpatterns = [
    path('', views.index, name='index'),
    path('realisations/', views.realisations, name='realisations'),
    path('realisation/<int:pk>/', views.realisation_detail, name='realisation_detail'),
]