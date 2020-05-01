from django.contrib.auth.models import User
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = [
    ]

    def create_superuser(apps, schema_editor):
        user = User.objects.create_superuser(
            username='capstone',
            email='capstone@student.american.edu',
            password='capstone')
        user.save()

    operations = [
        migrations.RunPython(create_superuser),
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField()),
                ('image', models.ImageField(upload_to='images/')),
            ],
        ),
    ]
