import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";

const Table = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchItem, setSearchItem] = useState("");
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [searchItem]);

  const sortHandler = (sortOrder) => {
    const sortedData = [...data];
    if (sortOrder === "asc") {
      sortedData.sort((a, b) => a.name.localeCompare(b.name));
      setSortOrder("desc");
    } else {
      sortedData.sort((a, b) => b.name.localeCompare(a.name));
      setSortOrder("asc");
    }
    setData(sortedData);
  };
  const searchHandler = (e) => {
    e.preventDefault();
    let filteredData = data.filter(
      (item) =>
        item.name.toLowerCase().includes(searchItem.toLowerCase()) ||
        item.username.toLowerCase().includes(searchItem.toLowerCase()) ||
        item.email.toLowerCase().includes(searchItem.toLowerCase())
    );
    // setSearchItem(filteredData);
    setData(filteredData);
    // setSearchItem("");
  };
  return (
    <div className="flex items-center justify-center my-4 max-w-full mx-10 overflow-x-scroll ">
      {loading ? (
        <p>loading...</p>
      ) : error ? (
        <p>{error.message}</p>
      ) : data.length > 0 ? (
        <table className=" divide-y divide-gray-200 border min-w-full  ">
          <tr className="border ">
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center justify-center cursor-pointer"
              onClick={() => sortHandler(sortOrder)}
            >
              name
              {sortOrder === "asc" ? (
                <div className="flex  flex-col items-center ml-2">
                  <IoMdArrowDropup style={{ opacity: 0.3 }} size={14} />
                  <IoMdArrowDropdown size={14} />
                </div>
              ) : (
                <div className="flex flex-col items-center ml-2">
                  <IoMdArrowDropup size={14} />
                  <IoMdArrowDropdown style={{ opacity: 0.3 }} size={14} />
                </div>
              )}
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              username
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              email
            </th>
          </tr>
       
          <tr className="border">
            <th colSpan={3} className="px-6 py-3">
              <form onSubmit={searchHandler}>
                <input
                  type="text"
                  value={searchItem}
                  onChange={(e) => setSearchItem(e.target.value)}
                  placeholder="Search by name, username, or email"
                  className="border border-gray-300 rounded-md px-3 py-2 mr-2"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Search
                </button>
              </form>
            </th>
          </tr>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item) => (
              <tr className="text-center" key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.username}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>no data available</p>
      )}
    </div>
  );
};

export default Table;
