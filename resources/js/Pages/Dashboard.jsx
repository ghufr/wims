import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/inertia-react";
// import Table from "@/Components/Table";

const Dashboard = ({ inventories = [] }) => {
  const columns = [
    {
      name: "Warehouse",
      selector: "warehouse_name",
    },
    {
      name: "Location",
      selector: "location_name",
    },
    {
      name: "Product",
      selector: "product_name",
    },
  ];
  return (
    <div>
      <Head title="Dashboard" />
      <div>
        <div className="mb-4">
          <h2 className="font-medium mb-3">On-Going Deliveries</h2>
          <div className="flex space-x-4">
            <div className="bg-white rounded-md p-4 border hover:border-gray-900">
              <h3 className="text-lg font-semibold">3</h3>
              <p className="text-gray-500 font-medium">Inbound Delivery</p>
            </div>
            <div className="bg-white rounded-md p-4 border hover:border-gray-900">
              <h3 className="text-lg font-semibold">3</h3>
              <p className="text-gray-500 font-medium">Outbound Delivery</p>
            </div>
          </div>
        </div>
        <div>
          <h2 className="font-medium mb-3">Inventory List</h2>
          {/* <Table
            columns={columns}
            data={inventories}
          /> */}
          {/* <div className="bg-white rounded-md p-4">

          </div> */}
        </div>
      </div>
    </div>
  );
};

Dashboard.layout = (page) => {
  const { props } = page;
  return (
    <Authenticated user={props.auth.user} title="Dashboard">
      {page}
    </Authenticated>
  );
};
export default Dashboard;
