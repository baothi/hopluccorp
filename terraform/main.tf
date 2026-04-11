terraform {
  required_version = ">= 1.0"

  required_providers {
    null = {
      source  = "hashicorp/null"
      version = "~> 3.0"
    }
  }
}

# ==============================================================
# Setup: Create Dokku apps, DB, Redis, env vars, domains, SSL
# ==============================================================
resource "null_resource" "dokku_setup" {
  triggers = {
    api_app    = var.api_app_name
    web_app    = var.web_app_name
    db_name    = var.db_name
    redis_name = var.redis_name
    host       = var.dokku_host
    ssh_key    = file(pathexpand(var.ssh_private_key_path))
  }

  connection {
    type        = "ssh"
    host        = self.triggers.host
    user        = "root"
    private_key = self.triggers.ssh_key
    timeout     = "2m"
  }

  # Upload setup script
  provisioner "file" {
    source      = "${path.module}/scripts/setup.sh"
    destination = "/tmp/hopluc-setup.sh"
  }

  # Run setup
  provisioner "remote-exec" {
    inline = [
      "chmod +x /tmp/hopluc-setup.sh",
      join(" ", [
        "API_APP=${var.api_app_name}",
        "WEB_APP=${var.web_app_name}",
        "DB_NAME=${var.db_name}",
        "REDIS_NAME=${var.redis_name}",
        "API_DOMAIN=${var.api_domain}",
        "WEB_DOMAIN=${var.web_domain}",
        "DJANGO_SECRET_KEY='${var.django_secret_key}'",
        "DJANGO_ADMIN_URL='${var.django_admin_url}'",
        "CLOUDINARY_CLOUD_NAME='${var.cloudinary_cloud_name}'",
        "CLOUDINARY_API_KEY='${var.cloudinary_api_key}'",
        "CLOUDINARY_API_SECRET='${var.cloudinary_api_secret}'",
        "SENTRY_DSN='${var.sentry_dsn}'",
        "/tmp/hopluc-setup.sh",
      ]),
    ]
  }

  # Teardown on destroy
  provisioner "file" {
    when        = destroy
    source      = "${path.module}/scripts/teardown.sh"
    destination = "/tmp/hopluc-teardown.sh"
  }

  provisioner "remote-exec" {
    when = destroy
    inline = [
      "chmod +x /tmp/hopluc-teardown.sh",
      "API_APP=${self.triggers.api_app} WEB_APP=${self.triggers.web_app} DB_NAME=${self.triggers.db_name} REDIS_NAME=${self.triggers.redis_name} /tmp/hopluc-teardown.sh",
    ]
  }
}
