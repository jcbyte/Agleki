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
        values = [num for num in range(nRange[0], nRange[1] + 1) if num != 0]

        if symbolChance > random.random():
            return Symbol(symbol) * random.choice(values) + random.choice(values)
        else:
            return random.choice(values)

    def LinExprSymbols(self, symbol1, symbol2, nRange):
        values = [num for num in range(nRange[0], nRange[1] + 1) if num != 0]

        return Symbol(symbol1) * random.choice(values) + Symbol(
            symbol2
        ) * random.choice(values)

    def SingleExprSymbol(self, symbol, nRange, expRange):
        nValues = [num for num in range(nRange[0], nRange[1] + 1) if num != 0]
        expValues = [num for num in range(expRange[0], expRange[1] + 1) if num != 0]
        return (Symbol(symbol) ** random.choice(expValues)) * random.choice(nValues)

    def QDeterminant(self, p):
        M = Matrix(
            [
                [self.LinExpr("k", [-3, 3], p), self.LinExpr("k", [-3, 3], p)],
                [self.LinExpr("k", [-3, 3], p), self.LinExpr("k", [-3, 3], p)],
            ]
        )
        return latex(M), latex(M.det()), "Find the Determinant of"

    def QExpand(self):
        expr1 = self.LinExprSymbols("a", "b", [-3, 3])
        expr2 = self.LinExprSymbols("a", "b", [-3, 3])
        return latex(expr1 * expr2), latex(expand(expr1 * expr2))

    def QSimplify(self):
        expr = self.SingleExprSymbol("q", [-3, 3], [1, 3]) * (
            self.LinExpr("p", [-4, 4], 0.99) + self.LinExprSymbols("p", "pi", [-4, 4])
        ) + self.SingleExprSymbol("q", [-3, 3], [1, 3]) * self.LinExpr(
            "p", [-4, 4], 0.99
        )
        return latex(expr), latex(expand(expr))

    def get(self, req, format=None):
        #difficulty = req.GET["d"]

        key = random.random()
        question = answer = title = None
        if (key <= 0.1):
            question, answer, title = self.QDeterminant(0.25)
        elif (key <= 1.0):
            question, answer, title = self.QExpand()


        #question, answer, title = self.QDeterminant(0.15)
        data = {"title" : title, "question": question, "answer": answer}
        return JsonResponse(data, status=status.HTTP_200_OK)
