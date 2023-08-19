import Table from "react-bootstrap/Table";

const CustomTable = (props: any) => {
  const { data, columns } = props;

  return (
    <>
      <Table bordered striped responsive>
        <thead>
          <tr>
            {columns.map((col: any, index: number) => (
              <th key={index}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data &&
            data?.map((row: any, index: number) => (
              <tr key={index}>
                {columns.map((col: any, colIndex: number) =>
                  col.render ? (
                    <td className="align-middle" key={colIndex}>
                      {col.render(row)}
                    </td>
                  ) : (
                    <td className="align-middle" key={colIndex}>
                      {row[col.key]}
                    </td>
                  )
                )}
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default CustomTable;
