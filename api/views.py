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
    def LinExpr(self, symbol, nRange, symbolChance):
        values = [num for num in range(nRange[0], nRange[1]+1) if num!=0]
        
        if (symbolChance > random.random()):
            return Symbol(symbol) * random.choice(values) + random.choice(values)
        else:
            return random.choice(values)
        
    def LinExprSymbols(self, symbol1, symbol2, nRange):
        values = [num for num in range(nRange[0], nRange[1]+1) if num!=0]
    
        return Symbol(symbol1) * random.choice(values) + Symbol(symbol2) * random.choice(values)

    def SingleExprSymbol(self, symbol, nRange, expRange):
        values = [num for num in range(nRange[0], nRange[1]+1) if num!=0]
        return (Symbol(symbol) ** random.choice(expRange)) * random.choice(nRange)

    def QDeterminant(self):
        M = Matrix([
            [self.LinExpr('k', [-3, 3], 0.5), self.LinExpr('k', [-3, 3], 0.5)], 
            [self.LinExprSymbols('k', 'a', [-3, 3]), self.LinExpr('k', [-3, 3], 0.5)]
            ])
        return {"Question" : latex(M) , "Answer" : latex(M.det())}

    def QExpand(self):
        expr1 = self.LinExprSymbols('a', 'b', [-3, 3])
        expr2 = self.LinExprSymbols('a', 'b', [-3, 3])
        return {"Question" : latex(expr1 * expr2) , "Answer" : latex(expand(expr1 * expr2))}

    def QSimplify(self):
        expr = self.SingleExprSymbol('q', [-3, 3], [1, 3]) * (
            self.LinExpr('p', [-4, 4], 0.99) + self.LinExprSymbols('p', 'pi', [-4, 4])
        ) + self.SingleExprSymbol('q', [-3, 3], [1, 3]) * self.LinExpr('p', [-4, 4], 0.99)
        return {"Question" : expr , "Answer" : latex(expand(expr))}
        

    def get(self, req, format=None):
        x = Symbol('x')
        

        #data = {"Question" : latex(M) , "Answer" : latex(M.det())}
        data = self.QSimplify()
        return JsonResponse(data, status=status.HTTP_200_OK)
