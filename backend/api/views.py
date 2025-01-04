from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import generics
from rest_framework import viewsets
# Create your views here.

from api.models import Note,Picture
from api.serializers import NoteSerializer, PictureSerializer

class NoteListCreate(generics.ListCreateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

class NoteDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer


class PictureViewSet(viewsets.ModelViewSet):
    queryset = Picture.objects.all()
    serializer_class = PictureSerializer