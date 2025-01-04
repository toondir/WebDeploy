from django.urls import path,include
from api import views
from .views import PictureViewSet
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
router = DefaultRouter()
router.register(r'pictures', PictureViewSet)

urlpatterns = [
    path('notes/', views.NoteListCreate.as_view(), name='note-list-create'),
    path('notes/<int:pk>/', views.NoteDetail.as_view(), name='note-detail'),
    
    path('picture/', include(router.urls)),

]


