"use strict";

import pkg from "typeorm/subscriber/event/InsertEvent.js";
const { InsertEvent } = pkg;
import Pagina from "../entity/pagina.entity.js";

class PaginaSubscriber {
  listenTo() {
    return Pagina;
  }

  async beforeInsert(event) {
    const lastPage = await event.manager.findOne(Pagina, { order: { id: "DESC" } });
    event.entity.numero = lastPage ? lastPage.id + 1 : 1;
  }
}

export default PaginaSubscriber;
