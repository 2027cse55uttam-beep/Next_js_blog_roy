from rest_framework import viewsets
from .models import Post, Category
from .serializers import PostSerializer, CategorySerializer
from django.db.models import Q # 'Q' object complex queries (OR/AND) ke liye hota hai

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all() 
    serializer_class = PostSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        queryset = Post.objects.all().order_by('-created_at')
        
        # 1. Category Filter (Purana code)
        category_slug = self.request.query_params.get('category', None)
        if category_slug is not None:
            queryset = queryset.filter(category__slug=category_slug)

        # 2. Search Filter (Naya code)
        search_query = self.request.query_params.get('search', None)
        if search_query:
            # Title MEIN ya Content MEIN dhoondho (icontains = case insensitive search)
            queryset = queryset.filter(
                Q(title__icontains=search_query) | Q(content__icontains=search_query)
            )
            
        return queryset

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'slug'