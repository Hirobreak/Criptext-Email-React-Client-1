#include "http.h"
#include <unistd.h>
#include <iostream>

struct mg_callbacks callbacks;
struct mg_context *ctx;

char* login_url;
char* get_kb_url;

const char* civet_options[] = {
    "document_root",
    ".",
    "listening_ports",
    "8085",
    "request_timeout_ms",
    "10000",
    "error_log_file",
    "error.log",
    "enable_auth_domain_check",
    "no",
    0
};

int decryptEmail(struct mg_connection *conn, void *cbdata){
  std::cout << "DECRYPT" << std::endl;
  return postDecryptEmail(conn, cbdata);
}

int decryptKey(struct mg_connection *conn, void *cbdata){
  std::cout << "DECRYPT KEY" << std::endl;
  return postDecryptKey(conn, cbdata);
}

int encryptKey(struct mg_connection *conn, void *cbdata){
  std::cout << "ENCRYPT KEY" << std::endl;
  return postEncryptKey(conn, cbdata);
}

int encryptEmail(struct mg_connection *conn, void *cbdata){
  std::cout << "ENCRYPT EMAIL" << std::endl;
  return postEncryptEmail(conn, cbdata);
}

int sessionCreate(struct mg_connection *conn, void *cbdata){
  std::cout << "SESSION CREATE" << std::endl;
  return processKeyBundle(conn, cbdata);
}

int pong(struct mg_connection *conn, void *cbdata){
  std::cout << "PING PING" << std::endl;
  mg_send_http_ok( conn, "text/plain", 5);
  mg_write(conn, "pong\n", 5);
  return 1;
}

void http_init(){
  login_url = getenv("BOB_LOGIN_URL");
  get_kb_url = getenv("BOB_GET_KEYBUNDLE_URL");

  ctx = mg_start(&callbacks, 0, civet_options);
  mg_set_request_handler(ctx, "/decrypt", decryptEmail, 0);
  mg_set_request_handler(ctx, "/decrypt/key", decryptKey, 0);
  mg_set_request_handler(ctx, "/encrypt/key", encryptKey, 0);
  mg_set_request_handler(ctx, "/encrypt/email", encryptEmail, 0);
  mg_set_request_handler(ctx, "/account", createAccount, 0);
  mg_set_request_handler(ctx, "/keybundle", createKeyBundle, 0);
  mg_set_request_handler(ctx, "/session/create", sessionCreate, 0);
  mg_set_request_handler(ctx, "/ping", pong, 0);
}

void http_shutdown(){
  mg_stop(ctx);
}