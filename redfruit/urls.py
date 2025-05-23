from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),  # Maps root URL to 'home' view
    path('ai-folder/', views.ai_folder, name='ai-folder'),
    path('how_it_works_page/', views.how_it_works_page, name='how-it-works'),
    path('discover_page/', views.discover, name='discover')
]
