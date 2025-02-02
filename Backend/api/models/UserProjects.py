from django.db import models # type: ignore

from .Users import Users
from .Projects import Projects

class UserProjects(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    project = models.ForeignKey(Projects, on_delete=models.CASCADE)

    USER_ROLE_CHOICES = [
        ('owner', 'Owner'),
        ('member', 'Member'),
        ('pending', 'Pending'),
    ]
    user_role = models.CharField(max_length=255, choices=USER_ROLE_CHOICES, default='pending')

    project_placement = models.IntegerField(default=0)

    def save(self, *args, **kwargs):
        if not self.pk:  # Si l'objet est créé pour la première fois
            # Trouver le dernier project_placement pour cet utilisateur
            last_placement = (
                UserProjects.objects.filter(user=self.user)
                .aggregate(max_placement=models.Max('project_placement'))['max_placement']
            )
            # Incrémenter la valeur du placement
            self.project_placement = (last_placement or 0) + 1

        super(UserProjects, self).save(*args, **kwargs)