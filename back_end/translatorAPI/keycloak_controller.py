import keycloak
from keycloak import KeycloakOpenID
from keycloak import KeycloakAdmin


def authenticate(usuario, contrasena):
    keycloak_openid = KeycloakOpenID(server_url="http://192.168.34.4:8080/auth/",
                                     client_id="my_react_client",
                                     realm_name="MyDemo",
                                     client_secret_key="secret",
                                     verify=True)

    flag_ = True
    token = None
    userinfo = None

    try:
        token = keycloak_openid.token(usuario, contrasena)
        userinfo = keycloak_openid.userinfo(token['access_token'])
    except:
        flag_ = False

    y = "{\"status\":\"not found\"}"
    if flag_:
        y = "{\"status\":\"ok\"}"

    return y


def validate(user_):
    keycloak_admin = KeycloakAdmin(server_url="http://192.168.34.4:8080/auth/",
                                   username='admin',
                                   password='admin',
                                   verify=True)
    keycloak_admin.realm_name = "myrealm"

    users = keycloak_admin.get_users({})

    flag_ = False
    for user in users:
        if user['username'] == user_:
            flag_ = True
            break

    if flag_:
        return "ok"
    else:
        return "no"

