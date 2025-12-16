from django.urls import path, include
from rest_framework.routers import DefaultRouter
# Neeche wali line update karein (CategoryViewSet add karein)
from .views import PostViewSet, CategoryViewSet 

router = DefaultRouter()
router.register(r'posts', PostViewSet)
router.register(r'categories', CategoryViewSet)

urlpatterns = [
    path('', include(router.urls)),
]