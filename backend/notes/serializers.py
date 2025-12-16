from rest_framework import serializers
from .models import Post, Category

# Category ke liye alag serializer
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']

class PostSerializer(serializers.ModelSerializer):
    # Nested Serializer use kar rahe hain taaki category ki details milein
    category = CategorySerializer(read_only=True)
    
    # Write operation ke liye category_id chahiye hoga (Admin/API form ke liye)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), source='category', write_only=True
    )

    class Meta:
        model = Post
        fields = '__all__'