import { useEffect, useState } from "react";
import { TickIcon, CrossIcon } from "../../components/StatusIcon";
import { toast } from "react-hot-toast";

function AdminLaundry() {
  const [data, setData] = useState([]);

  const fetchLaundry = async () => {
    const res = await fetch("http://localhost:5000/api/laundry", {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    });
    const d = await res.json();
    setData(d);
  };

  useEffect(() => {
    fetchLaundry();
  }, []);

  const updateStatus = async (id, status) => {
    await fetch(`http://localhost:5000/api/laundry/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify({ status })
    });

    toast.success("Status updated");
    fetchLaundry();
  };

  return (
    <table className="w-full border">
      <thead>
        <tr>
          <th>Room</th>
          <th>Type</th>
          <th>Count</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {data.map((l) => (
          <tr key={l._id} className="border-t text-center">
            <td>{l.room}</td>
            <td>{l.laundryType}</td>
            <td>{l.clothesCount}</td>
            <td>{l.status}</td>
            <td className="flex gap-2 justify-center">
              <button onClick={() => updateStatus(l._id, "Completed")}>
                <TickIcon />
              </button>
              <button onClick={() => updateStatus(l._id, "Rejected")}>
                <CrossIcon />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default AdminLaundry;
