"use strict";

const { InsertEvent } = require("typeorm");
const Pagina = require("../entity/pagina.entity.js");

class PaginaSubscriber {
  listenTo() {
    return Pagina;
  }

  async beforeInsert(event) {
    const lastPage = await event.manager.findOne(Pagina, { order: { id: "DESC" } });
    event.entity.numero = lastPage ? lastPage.id + 1 : 1;
  }
}

module.exports = PaginaSubscriber;
