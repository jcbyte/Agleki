from django.urls import path

urlpatterns = []

from .views import (
    GetQuestion,
)

urlpatterns = [
    path("getQuestion", GetQuestion.as_view()),
]
