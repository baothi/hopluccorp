from django.core.management import call_command
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Run ALL seed commands: users + homepage + about + organization + resources + projects + business fields + seo. Always reset before seeding."

    def handle(self, *args, **options):
        self.stdout.write(self.style.HTTP_INFO("=" * 50))
        self.stdout.write(self.style.HTTP_INFO("Running ALL seeds (reset + create)"))
        self.stdout.write(self.style.HTTP_INFO("=" * 50))

        # 1. Seed users
        self.stdout.write(self.style.HTTP_INFO("\n[1/8] Seeding users..."))
        call_command("seed_db", "--reset", stdout=self.stdout, stderr=self.stderr)

        # 2. Seed homepage
        self.stdout.write(self.style.HTTP_INFO("\n[2/8] Seeding homepage..."))
        call_command("seed_homepage", "--reset", stdout=self.stdout, stderr=self.stderr)

        # 3. Seed about page
        self.stdout.write(self.style.HTTP_INFO("\n[3/8] Seeding about page..."))
        call_command("seed_about", stdout=self.stdout, stderr=self.stderr)

        # 4. Seed organization page
        self.stdout.write(self.style.HTTP_INFO("\n[4/8] Seeding organization page..."))
        call_command("seed_organization", stdout=self.stdout, stderr=self.stderr)

        # 5. Seed resources page
        self.stdout.write(self.style.HTTP_INFO("\n[5/8] Seeding resources page..."))
        call_command("seed_resources", stdout=self.stdout, stderr=self.stderr)

        # 6. Seed projects page
        self.stdout.write(self.style.HTTP_INFO("\n[6/8] Seeding projects page..."))
        call_command("seed_projects", "--reset", stdout=self.stdout, stderr=self.stderr)

        # 7. Seed business fields
        self.stdout.write(self.style.HTTP_INFO("\n[7/8] Seeding business fields..."))
        call_command("seed_business_fields", "--reset", stdout=self.stdout, stderr=self.stderr)

        # 8. Seed SEO
        self.stdout.write(self.style.HTTP_INFO("\n[8/8] Seeding SEO metadata..."))
        call_command("seed_seo", stdout=self.stdout, stderr=self.stderr)

        self.stdout.write(self.style.SUCCESS("\n" + "=" * 50))
        self.stdout.write(self.style.SUCCESS("ALL seeds completed successfully!"))
        self.stdout.write(self.style.SUCCESS("=" * 50))
