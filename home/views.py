from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.shortcuts import render
from django.template import loader
from .models import Game
# Create your views here.

def index(req):
	return render(req, 'home/game.html')
	if req.user:
		games = Game.objects.all()
		return render(req, 'home/index.html', {'user': req.user, 'games_list': games})
	return render(req, 'home/login.html')

def signup(req):
	username = req.POST.get('username')
	password = req.POST.get('password')
	if req.POST.get('signup') != None:
		for user in User.objects.all():
			if user.username == username:
				return HttpResponse('username taken')
		user = User.objects.create_user(username, password=password)
	user = authenticate(req, username=username, password=password)
	if user == None:
		return HttpResponse('not logged in')
	login(req, user)
	return HttpResponse('logged in')

