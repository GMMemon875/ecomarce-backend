import { createOrderItemTable } from "../models/orderItemsTable.js";
import { createOrdersTable } from "../models/ordersTable.js";
import { createPaymentsTable } from "../models/paymentsTable.js";
import { createProductsTable } from "../models/productTable.js";
import { createShippingInfoTable } from "../models/shippingInfoTable.js";
import { createUserTable } from "../models/userTable.js";
import { createProductReviewsTable } from "../models/productReviewsTable.js";

export const createTables = async () => {
  try {
    await createUserTable();
    await createProductsTable();
    await createOrdersTable();
    await createOrderItemTable();
    await createPaymentsTable();
    await createShippingInfoTable();
    await createProductReviewsTable();
    console.log("ALL table is connected");
  } catch (error) {
    console.error("❌ Failed To Create Tables.", error);
  }
};
