from django.db import models  # type: ignore
from .Users import Users
import random
import string

class Projects(models.Model):
    tagname = models.CharField(max_length=80, unique=True, null=False, blank=False)
    name = models.CharField(max_length=22)
    description = models.TextField()
    created_by = models.ForeignKey(Users, on_delete=models.CASCADE)
    creation_date = models.DateTimeField(auto_now_add=True)
    markdown = models.TextField(null=True, blank=True)

    def save(self, *args, **kwargs):
        # Vérifie si le tagname est vide
        if not self.tagname:
            self.tagname = self.name  # Utilise le nom comme base pour le tagname

        # Génère 4 caractères UTF-8 aléatoires, sans caractères problématiques pour une URL
        safe_characters = string.ascii_letters + string.digits + "-_.~"  # Caractères sûrs pour une URL
        random_suffix = ''.join(random.choices(safe_characters, k=4))

        # Ajoute le suffixe au tagname
        self.tagname = self.tagname[:76]
        self.tagname += f"_{random_suffix}"

        # Appelle la méthode save parent
        super(Projects, self).save(*args, **kwargs)
