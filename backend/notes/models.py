from django.db import models
from ckeditor.fields import RichTextField

# 1. New Category Model
class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Categories" # Admin panel me sahi naam dikhane ke liye

# 2. Update Post Model
class Post(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='posts', null=True, blank=True) # Link added
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    image = models.ImageField(upload_to='blog_images/', blank=True, null=True)
    excerpt = models.TextField(blank=True, null=True)
    content = RichTextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title