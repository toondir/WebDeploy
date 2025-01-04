from rest_framework import serializers
from .models import Note,Picture

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__' 


class PictureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Picture
        fields =['id', 'image', 'description','date_taken','latitude','longitude']

