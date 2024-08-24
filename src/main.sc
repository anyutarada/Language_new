require: router.js
  init:
    bind("preMatch", processRequest);
    bind("postProcess", processRequest, "/Redirect");

theme: /

    state: Request
        q!: *

    state: Redirect