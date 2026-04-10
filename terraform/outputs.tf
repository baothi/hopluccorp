output "api_url" {
  value = "https://${var.api_domain}"
}

output "web_url" {
  value = "https://${var.web_domain}"
}

output "admin_url" {
  value = "https://${var.api_domain}/${var.django_admin_url}"
}

output "ssh_command" {
  value = "ssh root@${var.dokku_host}"
}

output "teardown_command" {
  value = "terraform destroy -auto-approve"
}
