from django.db import models # type: ignore

class Users(models.Model):
    tagname = models.CharField(max_length=255, unique=True)
    pseudo = models.CharField(max_length=255)
    firstname = models.CharField(max_length=255)
    lastname = models.CharField(max_length=255)
    mail = models.EmailField()
    phone = models.CharField(max_length=20)
    password = models.CharField(max_length=128)