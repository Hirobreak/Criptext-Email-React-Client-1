#include <civetweb.h>
#include <cjson/cJSON.h>
#include <string>
#include <iostream>
#include "../../crypto/signal.h"
#include "helpers.h"
#include "cors.h"

int postEncryptKey(struct mg_connection *conn, void *cbdata, SQLite::Database *db);
int postEncryptEmail(struct mg_connection *conn, void *cbdata, SQLite::Database *db);