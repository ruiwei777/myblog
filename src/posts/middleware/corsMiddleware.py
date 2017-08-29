from django.contrib.auth import (
    authenticate,
    login,
    )


class corsMiddleware(object):
    def process_response(self, req, resp):
        path = req.path_info
        # fix the CORS OPTIONS preflight
        if req.method == "OPTIONS" and path == "/api-token-auth/":
          if req.META["HTTP_ACCESS_CONTROL_REQUEST_METHOD"] == "POST" and req.META["HTTP_ACCESS_CONTROL_REQUEST_HEADERS"] == "content-type":
            resp["Access-Control-Allow-Headers"] = "content-type"
            resp["Access-Control-Allow-Methods"] = "POST"

        resp["Access-Control-Allow-Origin"] = "*"



        return resp


