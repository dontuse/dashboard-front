const folder = {
  "folders": [{
    "slug": "default",
    "title": "Заказы покупателей",
    "statuses": [{
      "slug": "pending",
      "title": "Новый"
    }, {
      "slug": "waiting",
      "title": "Ждет ответа покупателя"
    }, {
      "slug": "viewed",
      "title": "Просмотрен"
    }, {
      "slug": "viewed_by_customer",
      "title": "Просмотрен покупателем"
    }, {
      "slug": "on_consideration",
      "title": "На рассмотрении"
    }, {
      "slug": "on_process",
      "title": "В обработке"
    }, {
      "slug": "on_delivery",
      "title": "В доставке"
    }]
  }, {
    "slug": "pending",
    "title": "Новые",
    "statuses": [{
      "slug": "pending",
      "title": "Новый"
    }, {
      "slug": "waiting",
      "title": "Ждет ответа покупателя"
    }, {
      "slug": "viewed",
      "title": "Просмотрен"
    }, {
      "slug": "viewed_by_customer",
      "title": "Просмотрен покупателем"
    }, {
      "slug": "on_consideration",
      "title": "На рассмотрении"
    }]
  }, {
    "slug": "on_process",
    "title": "В работе",
    "statuses": [{
      "slug": "on_process",
      "title": "В обработке"
    }, {
      "slug": "on_delivery",
      "title": "В доставке"
    }]
  }, {
    "slug": "completed",
    "title": "Выполненные",
    "statuses": [{
      "slug": "completed",
      "title": "Выполнен"
    }]
  }, {
    "slug": "rejected",
    "title": "Отмененные",
    "statuses": [{
      "slug": "rejected",
      "title": "Отменен"
    }, {
      "slug": "rejected_by_customer",
      "title": "Отменен покупателем"
    }]
  }, {
    "slug": "spam",
    "title": "Спам",
    "statuses": [{
      "slug": "spam",
      "title": "Спам"
    }]
  }, {
    "slug": "expired",
    "title": "Просрочено",
    "statuses": [{
      "slug": "expired",
      "title": "Просрочен"
    }]
  }, {
    "slug": "archived",
    "title": "Архив",
    "statuses": [{
      "slug": "archived",
      "title": "Архив"
    }]
  }]
};

export default folder;
