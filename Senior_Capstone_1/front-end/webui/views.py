from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.http import HttpResponseRedirect
from django.shortcuts import render, redirect
from django.urls import reverse

from webui.cnn import Model
from webui.cnn.models import Image

model = Model()

def home(request):
    if not request.user.is_authenticated:
        return redirect('/login')

    if request.method == 'POST':
        image = Image.create(request.FILES['upload'])
        image.save()
        diagnoses = model.predict(image.image.path)
        return render(request, 'main/index.html', {
            'url': image.image.url,
            'diagnoses': diagnoses,
        })
    return render(request, 'main/index.html')

def login(request):
    if request.method == 'POST':
        username = request.POST.get('username', '')
        password = request.POST.get('password', '')
        user = authenticate(username=username, password=password)
        if user:
            auth_login(request, user)
            return redirect('/')
    return render(request, 'main/login.html')

def logout(request):
    auth_logout(request)
    return redirect('/login')
