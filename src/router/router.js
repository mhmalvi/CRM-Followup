const express = require("express");
const router = express.Router();
const {
  list,
  change_status,
  store,
  update,
  get_by_user_id,
  destroy,
} = require("../controllers/notificationController");
const {
  notificationView,
} = require("../controllers/notificationViewController");
const { fetchAll } = require("../controllers/NotificationFetchController");

//////////////////// routers  start ////////////////

router.route("/notifications-list").post(list);
router.route("/change-status").post(change_status);
router.route("/follow-up").post(store);
router.route("/follow-up-update").put(update);
router.route("/follow-up-by-user").post(get_by_user_id);
router.route("/delete-notification").post(destroy);

router.route("/notification-view").post(notificationView);
router.route("/notification-fetch").post(fetchAll);

//////////////////// routers  end ///////////////

module.exports = router;
