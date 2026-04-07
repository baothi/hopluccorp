from rest_framework.exceptions import APIException


class CustomValidationError(APIException):
    status_code = 400
    default_detail = "Invalid input."
    default_code = "invalid"


class NotFoundError(APIException):
    status_code = 404
    default_detail = "Not found."
    default_code = "not_found"
