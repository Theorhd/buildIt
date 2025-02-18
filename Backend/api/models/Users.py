from django.db import models

class Users(models.Model):
    tagname = models.CharField(max_length=22, unique=True)
    pseudo = models.CharField(max_length=255)
    firstname = models.CharField(max_length=50, null=True, blank=True)
    lastname = models.CharField(max_length=50, null=True, blank=True)
    mail = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, null=True, blank=True)
    password = models.CharField(max_length=128)
    is_active = models.BooleanField(default=True)