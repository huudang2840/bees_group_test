import { useEffect, useState } from "react";
import "./App.css";
import CustomPagination from "./components/customPagination";
import CustomTable from "./components/customTable";
import dataJSON from "./data/data.json";
import { convertToDateString, formatCurrency } from "./utils/helper";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { BsPencil, BsTrash } from "react-icons/bs";
import Modal from "react-bootstrap/Modal";

interface TUser {
  id: string;
  name: string;
  balance: number;
  email: string;
  registerAt: Date;
  active: boolean;
}

const dataFromServer = dataJSON.map((element) => {
  return { ...element, id: String(element.id), registerAt: new Date(element.registerAt) };
});

function App() {
  // Init states and variables
  const [data, setData] = useState<TUser[]>();
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowsPerPage = 10;
  const [show, setShow] = useState({ editModal: false, delModal: false });

  // When change currentPage and setData suitable
  useEffect(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    setData(dataFromServer.slice(startIndex, endIndex));
  }, [currentPage]);

  // Handling checked of each item
  const handleChecked = (id: string) => {
    if (checkedList) {
      checkedList?.includes(id)
        ? setCheckedList(checkedList.filter((checkedId: string) => checkedId !== id))
        : setCheckedList([...checkedList, id]);
    } else {
      setCheckedList([id]);
    }
  };

  // Handling checked all item per page
  const handleCheckAll = () => {
    const allIdsPerPage = data?.map((element) => element.id);
    const isCheckedAll = allIdsPerPage?.every((id) => checkedList?.includes(id));

    if (isCheckedAll) {
      setCheckedList(checkedList.filter((id: string) => !allIdsPerPage?.includes(id)));
    } else {
      const newChecked = allIdsPerPage?.filter((id) => !checkedList?.includes(id));
      newChecked && setCheckedList([...checkedList, ...newChecked]);
    }
  };

  const columns = [
    {
      header: (
        <div className="checkbox_name">
          <input
            type="checkbox"
            name="all"
            id="all"
            checked={checkedList ? data?.every((row) => checkedList?.includes(row.id)) : false}
            onChange={handleCheckAll}
          />
          <span>Name</span>
        </div>
      ),
      key: "name",
      render: (element: TUser) => {
        return (
          <div className="checkbox_name">
            <input
              type="checkbox"
              name={element.name}
              id={element.id}
              checked={checkedList ? checkedList?.includes(element.id) : false}
              onChange={() => handleChecked(element.id)}
            />
            <label htmlFor={element.name}> {element.name}</label>
          </div>
        );
      },
    },
    {
      header: "Balance($)",
      key: "balance",
      render: (element: TUser) => formatCurrency(element.balance, "$"),
    },
    {
      header: "Email",
      key: "email",
      render: (element: TUser) => {
        return (
          <a className="email" href={`mailto:${element.email}`}>
            {element.email}
          </a>
        );
      },
    },
    {
      header: "Registration",
      key: "registerAt",
      render: (element: TUser) => {
        return (
          <OverlayTrigger
            placement="right"
            delay={{ show: 200, hide: 200 }}
            overlay={(props) => (
              <Tooltip id="button-tooltip" {...props}>
                {element.registerAt.toString()}
              </Tooltip>
            )}
          >
            <Button className="btn_hover_date" variant="link">
              {convertToDateString(element.registerAt)}
            </Button>
          </OverlayTrigger>
        );
      },
    },
    {
      header: "STATUS",
      key: "active",
      render: (element: TUser) =>
        element.active ? (
          <div className="status active">Active</div>
        ) : (
          <div className="status">Inactive</div>
        ),
    },
    {
      header: <span className="header_action">ACTION</span>,
      render: (element: TUser) => (
        <div className="btn_action">
          <BsPencil onClick={() => setShow({ ...show, editModal: true })} />{" "}
          <BsTrash onClick={() => setShow({ ...show, delModal: true })} />
        </div>
      ),
    },
  ];
  console.log(show);

  return (
    <div className="container">
      <h1>App Development Test</h1>
      <div className="table_container">
        <CustomTable data={data} columns={columns} />
      </div>
      <div className="pagination">
        <span>{`${dataFromServer.length} results`}</span>
        <CustomPagination
          total={dataFromServer?.length}
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
          onChangePage={(page: number) => {
            setCurrentPage(page);
          }}
        />
      </div>
      <Modal show={show.editModal} onHide={() => setShow({ ...show, editModal: false })}>
        <Modal.Header closeButton>
          <Modal.Title>Modal Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>Features not yet developed!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow({ ...show, editModal: false })}>
            Close
          </Button>
          <Button variant="primary" onClick={() => setShow({ ...show, editModal: false })}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show.delModal} onHide={() => setShow({ ...show, delModal: false })}>
        <Modal.Header closeButton>
          <Modal.Title>Modal Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure delete! Features not yet developed!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow({ ...show, delModal: false })}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => setShow({ ...show, delModal: false })}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
