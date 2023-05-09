from django.shortcuts import render

from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse

# Create your views here.


class GetQuestion(APIView):
    def get(self, req, format=None):
        data = {"test": 200}
        return JsonResponse(data, status=status.HTTP_200_OK)
