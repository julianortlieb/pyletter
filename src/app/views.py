from django.http import HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from . import prediction

def index(request):
    return render(request, 'index.html')

@csrf_exempt
def predict(request):
    return HttpResponse(prediction.predict(request.body))