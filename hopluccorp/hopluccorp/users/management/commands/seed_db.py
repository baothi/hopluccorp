from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand

User = get_user_model()


class Command(BaseCommand):
    help = "Seed database with initial data"

    def add_arguments(self, parser):
        parser.add_argument(
            "--reset",
            action="store_true",
            help="Delete all existing seed data before seeding",
        )

    def handle(self, *args, **options):
        if options["reset"]:
            self.stdout.write("Resetting seed data...")
            User.objects.filter(is_superuser=False).delete()
            self.stdout.write(self.style.WARNING("Seed data deleted."))

        self.stdout.write("Seeding database...")

        # --- Superuser ---
        if not User.objects.filter(is_superuser=True).exists():
            User.objects.create_superuser(
                username="admin",
                email="admin@hopluccorp.com",
                password="admin123456",
                first_name="Admin",
                last_name="HopLucCorp",
            )
            self.stdout.write(self.style.SUCCESS("  Created superuser: admin@hopluccorp.com / admin123456"))
        else:
            self.stdout.write("  Superuser already exists, skipping.")

        # --- Staff users ---
        staff_users = [
            {"username": "staff1", "email": "staff1@hopluccorp.com", "first_name": "Staff", "last_name": "One", "is_staff": True},
            {"username": "staff2", "email": "staff2@hopluccorp.com", "first_name": "Staff", "last_name": "Two", "is_staff": True},
        ]
        for data in staff_users:
            user, created = User.objects.get_or_create(
                username=data["username"],
                defaults={**data, "phone_number": "0900000000"},
            )
            if created:
                user.set_password("staff123456")
                user.save()
                self.stdout.write(self.style.SUCCESS(f"  Created staff: {data['email']} / staff123456"))
            else:
                self.stdout.write(f"  Staff {data['username']} already exists, skipping.")

        # --- Regular users ---
        regular_users = [
            {"username": "user1", "email": "user1@example.com", "first_name": "User", "last_name": "One"},
            {"username": "user2", "email": "user2@example.com", "first_name": "User", "last_name": "Two"},
            {"username": "user3", "email": "user3@example.com", "first_name": "User", "last_name": "Three"},
        ]
        for data in regular_users:
            user, created = User.objects.get_or_create(
                username=data["username"],
                defaults={**data, "phone_number": "0900000000"},
            )
            if created:
                user.set_password("user123456")
                user.save()
                self.stdout.write(self.style.SUCCESS(f"  Created user: {data['email']} / user123456"))
            else:
                self.stdout.write(f"  User {data['username']} already exists, skipping.")

        self.stdout.write(self.style.SUCCESS("\nDatabase seeding completed!"))
        self.stdout.write(self.style.SUCCESS("Summary:"))
        self.stdout.write(f"  Total users: {User.objects.count()}")
        self.stdout.write(f"  Superusers: {User.objects.filter(is_superuser=True).count()}")
        self.stdout.write(f"  Staff: {User.objects.filter(is_staff=True, is_superuser=False).count()}")
        self.stdout.write(f"  Regular: {User.objects.filter(is_staff=False).count()}")
