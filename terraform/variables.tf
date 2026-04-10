variable "dokku_host" {
  description = "IP of the Dokku server"
  type        = string
}

variable "ssh_private_key_path" {
  description = "Path to SSH private key for root@dokku_host"
  type        = string
  default     = "~/.ssh/id_rsa"
}

# ---- App names ----
variable "api_app_name" {
  default = "hopluc-api"
}

variable "web_app_name" {
  default = "hopluc-web"
}

variable "db_name" {
  default = "hopluc-db"
}

variable "redis_name" {
  default = "hopluc-redis"
}

# ---- Domains ----
variable "api_domain" {
  description = "Domain for backend API"
  type        = string
  default     = "hoplucapi.verde.vn"
}

variable "web_domain" {
  description = "Domain for frontend"
  type        = string
  default     = "hopluc.verde.vn"
}

# ---- Django env vars ----
variable "django_secret_key" {
  description = "Django SECRET_KEY"
  type        = string
  sensitive   = true
}

variable "django_admin_url" {
  description = "Django admin URL path"
  type        = string
  default     = "hlc-admin/"
}

variable "cloudinary_cloud_name" {
  type      = string
  sensitive = true
}

variable "cloudinary_api_key" {
  type      = string
  sensitive = true
}

variable "cloudinary_api_secret" {
  type      = string
  sensitive = true
}

variable "sentry_dsn" {
  description = "Sentry DSN (optional)"
  type        = string
  default     = ""
}
