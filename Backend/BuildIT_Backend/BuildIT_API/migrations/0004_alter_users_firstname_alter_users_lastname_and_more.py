# Generated by Django 5.1.4 on 2024-12-13 10:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('BuildIT_API', '0003_users_is_active'),
    ]

    operations = [
        migrations.AlterField(
            model_name='users',
            name='firstname',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='users',
            name='lastname',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='users',
            name='phone',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
    ]
