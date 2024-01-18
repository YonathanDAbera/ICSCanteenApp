import useDashboardOrderDetails from "../../hooks/useDashboardOrderDetails";
import AdminOrderStateChart from "./AdminOrderStateChart";
import { Fragment } from "react";
import GoBackLink from "../GoBackLink";
import {
  Page,
  OrderId,
  DetailTable,
  ClientInfo,
} from "../account/UserOrderDetailsPage";

export default function OrderDetails() {
  const { thisOrder, isRefreshing, isLoading, setIsRefreshing } =
    useDashboardOrderDetails();

  return (
    <Page>
      {isLoading ? null : (
        <Fragment>
          <GoBackLink to="/dashboard/orders">Go back</GoBackLink>

          <OrderId>
            Nº ID:<span>{thisOrder?.orderID}</span>
          </OrderId>

          <AdminOrderStateChart
            states={thisOrder?.states}
            orderId={thisOrder?._id}
            makeRefresh={setIsRefreshing}
            refreshState={isRefreshing}
          />

          <h3>Shipment details</h3>

          <ClientInfo>
            <p>
              <b>Recipient Address:</b>
              {thisOrder?.client[0]?.name}
            </p>
            <p>
              <b>Address: </b>
              {thisOrder?.client[0]?.address}
            </p>
            <p>
              <b>Phone Number:</b>
              {thisOrder?.client[0]?.number}
            </p>
          </ClientInfo>
          <br></br>

          <h3>Order details</h3>
          <DetailTable>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Units</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {thisOrder?.description?.map((productInf) => (
                <tr key={productInf?._id}>
                  <td>
                    <b>{productInf?.product?.name}</b>
                  </td>
                  <td>${productInf?.product?.price}</td>
                  <td>{productInf?.quantity}</td>
                  <td>${productInf?.total}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="4">
                  <h4>
                    <span>Total:</span>${thisOrder?.total}
                  </h4>
                </td>
              </tr>
            </tfoot>
          </DetailTable>
        </Fragment>
      )}
    </Page>
  );
}
