from django.shortcuts import render

from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse

from sympy import *
import random
# Create your views here.


class GetQuestion(APIView):
    def LinExpr2Range(symbol, nRange, sRange, symbolChance):
        if (symbolChance > random.random()):
            return Symbol(symbol) * random.randint(sRange[0], sRange[1]) + random.randint(nRange[0], nRange[1])
        else:
            return random.randint(nRange[0], nRange[1])
        
    def LinExpr(symbol, range, symbolChance):
        if (symbolChance > random.random()):
            return Symbol(symbol) * random.randint(range[0], range[1]) + random.randint(range[0], range[1])
        else:
            return random.randint(range[0], range[1])

    def get(self, req, format=None):
        x = Symbol('x')
        M = Matrix([
            [self.LinExpr('k', [-3, 3], 0.5), self.LinExpr('k', [-3, 3], 0.5)], 
            [self.LinExpr('k', [-3, 3], 0.5), self.LinExpr('k', [-3, 3], 0.5)]
            ])

        data = {"Question" : latex(M) , "Answer" : latex(M.det())}
        return JsonResponse(data, status=status.HTTP_200_OK)
