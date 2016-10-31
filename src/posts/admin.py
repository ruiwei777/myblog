from django.contrib import admin

# Register your models here.
from .models import Post

class PostAdmin(admin.ModelAdmin):




	# fields = ('title', 'content', 'image')
	list_display = ('id', 'title', 'content', 'updated', 'slug')
	list_display_links = ('title',)
	list_filter = ('title',)
	search_fields = ['title']




admin.site.register(Post, PostAdmin)