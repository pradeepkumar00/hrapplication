# Generated by Django 4.2.14 on 2024-08-12 19:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0002_taskupdate'),
    ]

    operations = [
        migrations.AlterField(
            model_name='taskupdate',
            name='task_data',
            field=models.CharField(default=list),
        ),
    ]
