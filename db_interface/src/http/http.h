#include <stdlib.h>
#include <string>
#include <civetweb.h>
#include "./handlers/readDB.h"
#include "./handlers/writeDB.h"

void http_init(char *dbPath, char *port);
void http_shutdown();